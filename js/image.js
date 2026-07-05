async function generateImage() {

  const prompt = document.getElementById("imagePrompt").value.trim();
  const style = document.getElementById("imageStyle").value;
  const imageSize = document.getElementById("imageSize").value;

  const generateBtn = document.getElementById("generateBtn");
  const loading = document.getElementById("loading");
  const imageBox = document.getElementById("imageResult");

  if (!prompt) {
    alert("Please enter an image prompt.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerHTML = "⏳ Generating...";
  loading.style.display = "block";
  imageBox.innerHTML = "";

  try {

    const response = await fetch(
  "https://animverse-api.khanmaksud1234.workers.dev",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "image",
      prompt: style + " " + prompt
    })
  }
);
        

    if (!response.ok) {
      throw new Error("Image generation failed");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "100%";
    img.style.borderRadius = "15px";

    imageBox.innerHTML = "";
    imageBox.appendChild(img);

    // Download Button
    const downloadBtn = document.createElement("button");
    downloadBtn.innerHTML = "⬇ Download";
    downloadBtn.onclick = () => {
      window.open(imageUrl, "_blank");
    };
    imageBox.appendChild(document.createElement("br"));
    imageBox.appendChild(downloadBtn);

    // Favorite
    const favBox = document.getElementById("favoriteImages");

    const favBtn = document.createElement("button");
    favBtn.innerHTML = "❤️ Favorite";

    favBtn.onclick = () => {

      const favImg = document.createElement("img");
      favImg.src = imageUrl;
      favImg.style.width = "100%";
      favImg.style.borderRadius = "10px";

      favBox.prepend(favImg);

      favBtn.disabled = true;
      favBtn.innerHTML = "❤️ Saved";

    };

    imageBox.appendChild(document.createElement("br"));
    imageBox.appendChild(favBtn);

    // History
    const historyBox = document.getElementById("imageHistory");

    const historyImg = document.createElement("img");
    historyImg.src = imageUrl;
    historyImg.style.width = "100%";
    historyImg.style.borderRadius = "10px";
    historyImg.style.cursor = "pointer";

    historyImg.onclick = () => {
      window.open(imageUrl, "_blank");
    };

    historyBox.prepend(historyImg);

  } catch (error) {

    imageBox.innerHTML = `
      <h3>❌ Image Generate Failed</h3>
      <p>${error.message}</p>
    `;

  }

  loading.style.display = "none";
  generateBtn.disabled = false;
  generateBtn.innerHTML = "🎨 Generate Image";

}