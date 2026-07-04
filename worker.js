export default {
  async fetch(request, env) {

    const { prompt } = await request.json();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/THUDM/CogVideoX-5B",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    return new Response(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "video/mp4"
      }
    });

  }
}