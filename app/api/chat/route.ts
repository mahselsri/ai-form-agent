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

Schema:

{
 "title":"",

 "steps":[
   {
     "title":"",
     "description":"",
     "links":[
       {
         "title":"",
         "url":"",
         "description":""
       }
     ]
   }
 ],

 "documents":[
   {
     "name":"",
     "description":""
   }
 ],

 "timeline":[
   {
     "stage":"",
     "duration":""
   }
 ],

 "notes":[
   ""
 ],

 "links":[
   {
     "title":"",
     "url":"",
     "description":""
   }
 ]
   "followups":[ "" ]
    "story":[
   {
     "stage":"",
     "description":"",
     "emotion":""
   }
 ]

}

Rules:
- Always include official government website links if available
- Use only real official URLs
- If multiple useful links exist include them
- No explanation outside JSON
- Provide ONLY real and working official government URLs.
- Never invent URLs.
- Links must point to the correct official application or information page.
- Ensure URLs are valid and currently used government, official, valid portals.

Followups should contain 3 relevant questions the user may ask next.

Example:
"followups":[
 "What documents are needed?",
 "What is the passport fee?",
 "How long does the process take?"
]

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