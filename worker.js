export default {
  async fetch(request, env) {

    return new Response(
      JSON.stringify({
        status: "success",
        message: "AnimVerse AI Worker Connected Successfully"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }
}