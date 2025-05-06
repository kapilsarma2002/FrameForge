from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
from mistralai import Mistral
import os
import uuid
import subprocess

app = FastAPI()

load_dotenv()

# Ensure the 'videos' directory exists
os.makedirs("videos", exist_ok=True)

api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-small-latest"
client = Mistral(api_key = api_key)

app.mount("/videos", StaticFiles(directory="videos"), name="videos")

class PromptRequest(BaseModel):
    prompt: str

class VideoResponse(BaseModel):
    video_url: str

@app.post("/api/generate", response_model=VideoResponse)
async def generate_video(request: PromptRequest):
    prompt = request.prompt

    # Step 1: Get code from GPT
    try:
        manim_code = await prompt_to_manim_code(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"GPT Error: {e}")

    # Step 2: Save code to file
    filename_base = str(uuid.uuid4())
    script_path = f"videos/{filename_base}.py"
    with open(script_path, "w") as f:
        f.write(manim_code)

    # Step 3: Run Manim in Docker
    try:
        render_manim(script_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Manim Render Error: {e}")

    video_url = f"/videos/media/videos/{filename_base}/480p15/{filename_base}.mp4"
    return VideoResponse(video_url=video_url)

async def prompt_to_manim_code(prompt: str) -> str:
    system_msg = "You are a Manim expert. Generate a simple Manim scene in Python for the prompt."
    user_msg = f"Create a Manim scene for: {prompt}. Use a class named Scene."

    chat_response = client.chat.complete(
    model = model,
    messages=[
        {
            "role": "system", 
            "content": system_msg
        },
        {
           "role": "user", 
           "content": user_msg
        }
    ])

    print('response from ai: ', chat_response)

    return chat_response.choices[0].message.content

def render_manim(script_path: str):
    script_file = os.path.basename(script_path)
    script_dir = os.path.dirname(os.path.abspath(script_path))

    subprocess.run([
        "docker", "run", "--rm",
        "-v", f"{script_dir}:/manim",
        "manimcommunity/manim", script_file, "Scene",
        "-ql", "--media_dir=./media"
    ], check=True, cwd=script_dir)


