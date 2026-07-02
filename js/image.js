const HF_TOKEN = 		
hf_...PVhk

async function generateImage() {

  const prompt = document.getElementById("imagePrompt").value;

  if (prompt === "") {
    alert("Please enter image prompt.");
    return;
  }

  alert("Image Generator connected successfully!\n\nNext step me hum AI image generate karenge.");
}