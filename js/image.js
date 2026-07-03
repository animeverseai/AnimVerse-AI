async function generateImage() {
  
  const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");

generateBtn.disabled = true;
generateBtn.innerHTML = "⏳ Generating...";

loading.style.display = "block";

  const prompt = document.getElementById("imagePrompt").value.trim();
  const style = document.getElementById("imageStyle").value;

  if (!prompt) {
    loading.style.display = "none";
    generateBtn.disabled = false;
    generateBtn.innerHTML = "🎨 Generate Image";

    alert("Please enter an image prompt.");
    return;
}

  const imageBox = document.getElementById("imageResult");

  imageBox.innerHTML = "<h3>🎨 Generating AI Image...</h3>";

  const finalPrompt = `
${style},
${prompt},
ultra realistic,
masterpiece,
8k,
high quality,
cinematic lighting,
sharp focus,
professional photography,
highly detailed,
best quality
`;

  async function loadImage(retry = 3) {

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(finalPrompt) +
      "?width=1024&height=1024&seed=" +
      Date.now() +
      "&nolog=true";

    return new Promise((resolve, reject) => {

      const img = new Image();

      img.style.width = "100%";
      img.style.borderRadius = "15px";

      img.onload = () => resolve({ img, imageUrl });

      img.onerror = async () => {

        if (retry > 0) {

          imageBox.innerHTML =
            `<h3>🔄 Retrying... (${4 - retry}/3)</h3>`;

          setTimeout(async () => {
            try {
              resolve(await loadImage(retry - 1));
            } catch (e) {
              reject(e);
            }
          }, 1500);

        } else {

          reject();

        }

      };

      img.src = imageUrl;

    });

  }

  try {

    const { img, imageUrl } = await loadImage();

loading.style.display = "none";
generateBtn.disabled = false;
generateBtn.innerHTML = "🎨 Generate Image";
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

  } catch {

loading.style.display = "none";
generateBtn.disabled = false;
generateBtn.innerHTML = "🎨 Generate Image";
    imageBox.innerHTML = `
      <h3>❌ Image Generate Failed</h3>
      <p>Server busy hai. Please try again.</p>
  `;

  }

}
