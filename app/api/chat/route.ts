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
}

Rules:
- Always include official government website links if available
- Use only real official URLs
- If multiple useful links exist include them
- No explanation outside JSON
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