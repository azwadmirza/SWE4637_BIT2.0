export async function postQuery(data: string) {
  console.log("Question Asked");
  return fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({
      model: "llama2",
      prompt: `${data}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
