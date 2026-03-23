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
You are an expert in Indian government processes.

Return ONLY valid JSON.



Return JSON array:
[
  {
    "name":"",
    "description":"",
    "eligibility":"",
    "benefits":"",
    "link":""
  }
]

Rules strictly to be followed:
- Only real schemes
- Include official links
- Keep simple
- Always include official government website links if available
- Use only real official URLs
- If multiple useful links exist include them
- No explanation outside JSON
- Provide ONLY real and working official government URLs.
- Never invent new URLs.
- Links must point to the correct official application or information page.
- Ensure URLs are valid and currently used government, official, valid portals.
- dont provide spam, porn, violent, abuse, terror ,hate related evn if requested completely avoid
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