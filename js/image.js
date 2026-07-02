async function generateImage() {

  const prompt = document.getElementById("imagePrompt").value;

  if (!prompt) {
    alert("Please enter an image prompt.");
    return;
  }

  const imageBox = document.getElementById("imageResult");

  imageBox.innerHTML = "<p>⏳ AI Image Generate ho rahi hai...</p>";

  const imageUrl =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  imageBox.innerHTML = `
    <img src="${imageUrl}"
         style="max-width:100%;border-radius:12px;">
    <br><br>
    <a href="${imageUrl}" target="_blank">
      <button>Download Image</button>
    </a>
  `;
}