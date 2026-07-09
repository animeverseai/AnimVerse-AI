export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Use POST request" }),
        { status: 405, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    const body = await request.json();
    const prompt = body.prompt || "";
    const type = body.type || "image";

    if (type === "image") {
      try {
        const response = await env.AI.run(
          "@cf/stabilityai/stable-diffusion-xl-base-1.0",
          { prompt: prompt }
        );
        return new Response(response, {
          headers: { ...cors, "Content-Type": "image/png" }
        });
      } catch (err) {
        return new Response(
          JSON.stringify({ error: "Image generation failed", details: err.message }),
          { status: 502, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: "Video generation temporarily unavailable. Please try again later." }),
      { status: 503, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
};