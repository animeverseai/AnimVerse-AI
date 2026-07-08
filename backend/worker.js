import { InferenceClient } from "@huggingface/inference";

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

    // IMAGE
    if (type === "image") {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: prompt })
        }
      );
      return new Response(response.body, {
        headers: { ...cors, "Content-Type": "image/png" }
      });
    }

    // VIDEO — fast/lightweight model taaki free plan ki subrequest limit cross na ho
    try {
      const client = new InferenceClient(env.HF_TOKEN);
      const videoBlob = await client.textToVideo({
        provider: "fal-ai",
        model: "Lightricks/LTX-Video-0.9.8-13B-distilled",
        inputs: prompt
      });
      return new Response(videoBlob, {
        headers: { ...cors, "Content-Type":