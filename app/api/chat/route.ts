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
- dont provide spam, porn, violent, abuse, terror ,hate related evn if requested completely avoid

Followups should contain 3 relevant questions the user may ask next.

Example:

{
 "title":"Apply for Indian Passport",
 "steps":[
  {"title":"Create Passport Account","description":"Register on the Passport Seva portal using your email and mobile number."},
  {"title":"Fill Application Form","description":"Complete the passport application form with personal and address details."},
  {"title":"Pay Fees and Schedule Appointment","description":"Pay the passport fee online and book an appointment at the nearest Passport Seva Kendra."},
  {"title":"Visit Passport Office","description":"Carry required documents and attend the appointment for verification."},
  {"title":"Police Verification","description":"Local police will verify your address and identity."},
  {"title":"Passport Delivery","description":"After successful verification the passport is printed and delivered."}
 ],
 "documents":[
  {"name":"Aadhaar Card","description":"Identity and address proof"},
  {"name":"Birth Certificate","description":"Proof of date of birth"},
  {"name":"PAN Card","description":"Additional identity proof"}
 ],
 "timeline":[
  {"stage":"Application Submission","duration":"1 day"},
  {"stage":"Appointment Verification","duration":"1–3 days"},
  {"stage":"Police Verification","duration":"7–14 days"},
  {"stage":"Passport Printing & Dispatch","duration":"3–5 days"}
 ],
 "notes":[
  "Ensure your address proof matches your application.",
  "Carry original documents during the appointment."
 ],
 "links":[
  {
   "title":"Passport Seva Portal",
   "url":"https://passportindia.gov.in",
   "description":"Official portal for passport application"
  }
 ],
 "followups":[
  "Passport renewal process",
  "Documents required for minor passport",
  "Tatkal passport process"
 ],
 "story":[
  {"stage":"Start Application","description":"Create an account on the passport portal","emotion":"start"},
  {"stage":"Fill Application","description":"Submit personal details and required documents","emotion":"action"},
  {"stage":"Document Check","description":"Officials verify submitted documents","emotion":"check"},
  {"stage":"Police Verification","description":"Local police confirms address and identity","emotion":"verify"},
  {"stage":"Passport Delivered","description":"Passport printed and dispatched to your address","emotion":"success"}
 ],
 "followups":[
 "What documents are needed?",
 "What is the passport fee?",
 "How long does the process take?"
]
}



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