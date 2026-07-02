async function generateImage() {

  const prompt = document.getElementById("imagePrompt").value.trim();

  if (!prompt) {
    alert("Please enter an image prompt.");
    return;
  }

  const imageBox = document.getElementById("imageResult");

  imageBox.innerHTML = `
    <h3>🎨 Generating AI Image...</h3>
    <p>Please wait a few seconds.</p>
  `;

  const imageUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Date.now()}&nologo=true`;

  imageBox.innerHTML = `
      <img id="generatedImage"
           src="${imageUrl}"
           style="width:100%;border-radius:15px;box-shadow:0 0 20px rgba(0,0,0,.3);">

      <br><br>

      <a href="${imageUrl}" download="AnimVerseAI_Image.png">
          <button class="download-btn">
              ⬇ Download Image
          </button>
      </a>
  `;
}