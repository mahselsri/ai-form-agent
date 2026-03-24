import { groq } from "@/lib/groq";

export async function POST(req:any) {

const { message } = await req.json();
console.log("Incoming request:", message)

const completion = await groq.chat.completions.create({
model: "llama-3.3-70b-versatile",
temperature: 0.3,

messages: [
{
role: "system",
content: `
You are an expert assistant for Indian government schemes.

Return ONLY valid JSON.

Schema:

[
  {
    "name":"",
    "description":"",
    "eligibility":"",
    "benefits":"",
    "why_recommended":"",
    "best_for":"",
    "limitations":"",
    "comparison_hint":"",
    "score":0,
    "links":[
      {
        "title":"",
        "url":""
      }
    ]
  }
]

STRICT RULES:

- Only include REAL Indian government schemes
- Do NOT invent schemes
- Do NOT invent links
- Use ONLY official domains:
  - gov.in
  - nic.in
  - india.gov.in
- If unsure about link, leave links empty
- Keep description simple (1-2 lines)
- Keep eligibility simple
- Keep benefits short
- why_recommended must be personalized to user input
- best_for → who should choose this scheme
- limitations → any restrictions or downsides
- comparison_hint → short line explaining how it differs from others
- score must be between 1-10 based on relevance
- Return maximum 5 schemes
- No text outside JSON
- No markdown
`
},
{
role: "user",
content: message
}
]
});

const text:any = completion.choices[0].message.content;

const cleaned = text.replace(/```json|```/g, "").trim();

const json = JSON.parse(cleaned);

return Response.json(json);

}