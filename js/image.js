alert("image.js Loaded");
    
async function generateImage() {
  
  alert("Button Click Ho Gaya");

  const generateBtn = document.getElementById("generateBtn");
  const loading = document.getElementById("loading");
  const imageBox = document.getElementById("imageResult");

  const prompt = document.getElementById("imagePrompt").value.trim();
  const style = document.getElementById("imageStyle").value;
  const imageSize = document.getElementById("imageSize").value;

  if (!prompt) {
    alert("Please enter an image prompt.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerHTML = "⏳ Generating...";
  loading.style.display = "block";
  imageBox.innerHTML = "";

  const finalPrompt = `
${style} ${prompt},
ultra realistic,
masterpiece,
8k,
high quality,
cinematic lighting,
sharp focus,
professional photography,
highly detailed
`;

  async function loadImage(retry = 3) {

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(finalPrompt) +
      "?width=" + imageSize +
      "&height=" + imageSize +
      "&seed=" + Date.now() +
      "&nolog=true";

    return new Promise((resolve, reject) => {

      const img = new Image();

      img.style.width = "100%";
      img.style.borderRadius = "15px";

      img.onload = () => resolve({ img, imageUrl });

      img.onerror = () => {

        if (retry > 0) {

          imageBox.innerHTML =
            `<h3>🔄 Retrying... (${4 - retry}/3)</h3>`;

          setTimeout(() => {
            loadImage(retry - 1)
              .then(resolve)
              .catch(reject);
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

// ❤️ Favorite Button
const favBtn = document.createElement("button");
favBtn.innerHTML = "❤️ Favorite";
favBtn.style.marginTop = "15px";

favBtn.onclick = function () {

console.log("Favorite Clicked");
    const favBox = document.getElementById("favoriteImages");

alert(favBox);
    const favImg = document.createElement("img");

    favImg.src = imageUrl;
    favImg.style.width = "100%";
    favImg.style.borderRadius = "10px";

    favBox.prepend(favImg);

alert("Image Added");
    favBtn.innerHTML = "❤️ Saved";
    favBtn.disabled = true;

};

imageBox.appendChild(favBtn);

alert("Favorite Button Added");
// 🕘 History
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

// ⬇ Download Button
const downloadBtn = document.createElement("button");

downloadBtn.innerHTML = "⬇ Download Image";
downloadBtn.style.marginTop = "15px";

downloadBtn.onclick = function () {
    window.open(imageUrl, "_blank");
};

imageBox.appendChild(document.createElement("br"));
imageBox.appendChild(downloadBtn);

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