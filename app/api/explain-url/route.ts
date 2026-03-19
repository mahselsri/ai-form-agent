import { groq } from "@/lib/groq"

type Step = {
  title: string
  description: string
}

type Documents = {
  name: string
  description?: string
}

type TimelineItem = {
  stage: string
  duration: string
}

type StoryNode = {
  stage:string
  description:string
  emotion:string
}

type Comparison = {
  process: string
  difficulty: string
  time: string
  office_visit: string
  fees: string
}
export async function POST(req: Request){

console.log("Incoming request:")
const { url } = await req.json()
console.log("Incoming request:", url)
// use Jina reader proxy
const readerURL = `https://r.jina.ai/${url}`

const res = await fetch(readerURL)

const text = await res.text()

// limit size for AI
const cleanedText = text.slice(0,12000)

const completion = await groq.chat.completions.create({

model:"llama-3.3-70b-versatile",
temperature:0.2,

messages:[

{
role:"system",
content:`
You simplify Indian government webpages.

Explain the given website in simple language for a common user.

Return ONLY JSON in this format:

- what_this_site_is → Explain in 1-2 simple sentences
- who_should_use_this → Target users
- what_you_can_do_here → Key actions available
- how_to_use_this_site → Step-by-step navigation guidance
- important_links → ONLY real, working links from the website
- why_it_matters → Explain why user should click
- pro_tips → Helpful shortcuts or advice

Rules:
- No technical jargon
- No assumptions
- Keep it simple and actionable
- Links must be valid and relevant
- Use only real official URLs
- If multiple useful links exist include them
- No explanation outside JSON
- Provide ONLY real and working official government URLs.
- Never invent URLs.
- Links must point to the correct official application or information page.
- Ensure URLs are valid and currently used government, official, valid portals.
- dont provide spam, porn, violent, abuse, terror ,hate related evn if requested completely avoid


Example JSON output
{
  "title": "GST Council Website",

  "what_this_site_is": "This is the official website of the GST Council where decisions about GST rules, tax rates, and policies in India are published.",

  "who_should_use_this": "Business owners, accountants, tax consultants, and anyone looking for GST updates.",

  "what_you_can_do_here": [
    "Check latest GST rules and updates",
    "Read official GST meeting decisions",
    "Find FAQs related to GST",
    "Access GST-related resources"
  ],

  "how_to_use_this_site": [
    {
      "step": "Check latest GST updates",
      "action": "Go to 'GST Council Meetings' to see recent decisions"
    },
    {
      "step": "Find answers quickly",
      "action": "Use the FAQ section for common GST questions"
    },
    {
      "step": "Explore GST policies",
      "action": "Browse notifications and announcements"
    }
  ],

  "important_links": [
    {
      "title": "GST Council Meetings",
      "url": "https://www.gstcouncil.gov.in/gst-council-meeting",
      "why_it_matters": "Shows all official GST decisions and updates"
    },
    {
      "title": "FAQs",
      "url": "https://www.gstcouncil.gov.in/faq",
      "why_it_matters": "Quick answers to common GST doubts"
    }
  ],

  "pro_tips": [
    "Always check the latest meeting updates for rule changes",
    "Use FAQs before contacting support",
    "Bookmark important sections to save time"
  ]
}
`
},

{
role:"user",
content:`Explain this government webpage clearly for Indian users:

${cleanedText}`
}

]

})

const result = completion.choices?.[0]?.message?.content

if (!result) {
  return Response.json({
    error: "AI response is empty"
  }, { status: 500 })
}

const cleaned = result.replace(/```json|```/g, "").trim()

const json = JSON.parse(cleaned)
console.log("Json explain response:",json)
// convert to your guide format
return Response.json(json);

}