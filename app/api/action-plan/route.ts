import { groq } from "@/lib/groq"

export async function POST(req: Request){

const { scheme, userInput } = await req.json()

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
  messages: [
    {
      role: "system",
      content: `
You are an expert in Indian government processes.

Return ONLY JSON:

{
  "steps":[
    {"title":"","description":""}
  ],
  "documents":[ "" ],
  "timeline":[ "" ],
  "tips":[ "" ]
}

Rules:
- Keep steps practical
- Include real process flow
- No explanation outside JSON
`
    },
    {
      role: "user",
      content: `
User:
${userInput}

Scheme:
${scheme}

Generate a step-by-step action plan.
`
    }
  ]
})

const text = completion.choices[0].message.content

const cleaned = text.replace(/```json|```/g, "").trim()

const json = JSON.parse(cleaned)

return Response.json(json)

}