async function generateImage() {

  const prompt = document.getElementById("imagePrompt").value.trim();


const style = document.getElementById("imageStyle").value;
  if (!prompt) {
    alert("Please enter an image prompt.");
    return;
  }

  const imageBox = document.getElementById("imageResult");

  imageBox.innerHTML = "<h3>🎨 Generating AI Image...</h3>";

  const imageUrl =
  "https://image.pollinations.ai/prompt/" +
  encodeURIComponent(prompt);

  const img = new Image();

  img.style.width = "100%";
  img.style.borderRadius = "15px";

  img.onload = () => {
    imageBox.innerHTML = "";

    imageBox.appendChild(img);

    imageBox.innerHTML += `
      <br><br>
      <a href="${imageUrl}" target="_blank">
        <button class="download-btn">
          ⬇ Download Image
        </button>
      </a>
    `;
  };

  img.onerror = () => {
    imageBox.innerHTML = `
      <h3>❌ Image Generate Failed</h3>
      <p>Try again after a few seconds.</p>
    `;
  };

  img.src = imageUrl;
}