from google import genai
from PIL import Image
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# Set OpenAI API key
api_key = os.getenv("Debugger_API_KEY")

# Initialize the Gemini client
client = genai.Client(api_key=api_key)

def generate_response_issues(img):
    if img:
        pil_images = [Image.open(file) for file in img]
        prompt = "Describe all the issues in the image clearly. Do not provide any fixes, solutions, or code."
        response = client.models.generate_content(
            model="gemini-3-flash-preview", contents=[pil_images, prompt]
        )
        return response.text

def generate_response_solution(img, option):
    if img:
        pil_images = [Image.open(file) for file in img]
        if option=="Hint":
            prompt = "Provide hints and explanations to help fix the issues shown in the image. Do not give the full solution or complete code."
        else:
            prompt = "Provide the complete solution code along with a clear explanation to fix the issues shown in the image."
        response = client.models.generate_content(
            model="gemini-3-flash-preview", contents=[pil_images, prompt]
        )
        return response.text

