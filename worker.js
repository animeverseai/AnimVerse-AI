export default {
  async fetch(request, env) {

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    try {

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

      if (!response.ok) {
        const error = await response.text();
        return new Response(error, {
          status: response.status,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain"
          }
        });
      }

      return new Response(response.body, {
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "video/mp4",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {

      return new Response(err.message, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain"
        }
      });

    }

  }
}