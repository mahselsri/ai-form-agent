import { NextResponse } from "next/server"
import { schemesData } from "@/lib/schemesData"
import { groq } from "@/lib/groq"

export async function POST(req: Request){
    console.log("Incoming request")

try{

// ✅ 1. Get user input
const body = await req.json()
const userInput = body.userInput

if(!userInput){
  return NextResponse.json({ error: "User input required" }, { status: 400 })
}

// ✅ 2. Smart keyword filtering
const input = userInput.toLowerCase()

const filtered = schemesData.filter(s =>
  s.keywords?.some(k => input.includes(k))
)

// fallback if nothing matched
const baseSchemes = filtered.length > 0 ? filtered : schemesData

// ✅ 3. Prepare minimal data for AI
const baseData = baseSchemes.map(s => ({
  name: s.name,
  link: s.link
}))

// ✅ 4. Prompt
const prompt = `
User description:
"${userInput}"

From the below Indian government schemes, return ONLY relevant schemes.

Schemes:
${JSON.stringify(baseData)}

Return ONLY JSON array:

[
{
"name":"",
"description":"",
"eligibility":"",
"benefits":"",
"link":""
}
]

Rules:
- Only include relevant schemes
- Do NOT change links
- Keep explanation simple
- Max 5 results
`

// ✅ 5. Call Groq (your setup)
const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
})

// ✅ 6. Extract response safely
const result = completion?.choices?.[0]?.message?.content

if(!result){
  return NextResponse.json({ error: "Empty AI response" }, { status: 500 })
}

// ✅ 7. Clean AI output
const cleaned = result.replace(/```json|```/g, "").trim()

let parsed

try{
  parsed = JSON.parse(cleaned)
}catch(e){
  return NextResponse.json({ error: "Invalid JSON from AI" }, { status: 500 })
}

console.log("Final response:", parsed)
// ✅ 8. Merge with trusted links
const final = parsed.map((item:any) => {

const match = baseSchemes.find(s => s.name === item.name)

return {
  name: item.name || match?.name || "",
  description: item.description || "",
  eligibility: item.eligibility || "",
  benefits: item.benefits || "",
  link: match?.link || ""   // 🔥 always trusted
}

})

return NextResponse.json(final)

}catch(err:any){

return NextResponse.json({
  error: err.message || "Something went wrong"
},{ status: 500 })

}

}