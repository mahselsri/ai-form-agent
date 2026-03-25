"use client"

import { useState } from "react"

type Props = {
  schemeName: string
  userInput: string
}

type Plan = {
  steps?: { title: string; description: string }[]
  documents?: string[]
  timeline?: string[]
  tips?: string[]
}

export default function ActionPlan({ schemeName, userInput }: Props){

const [plan,setPlan] = useState<Plan | null>(null)
const [loading,setLoading] = useState(false)
const [open,setOpen] = useState(false)

async function generate(){

setOpen(true)

if(plan) return

setLoading(true)

const res = await fetch("/api/action-plan",{
  method:"POST",
  headers:{ "Content-Type":"application/json"},
  body: JSON.stringify({
    scheme: schemeName,
    userInput
  })
})

const data = await res.json()

setPlan(data)
setLoading(false)
}

return(

<>
{/* BUTTON */}
<button
onClick={generate}
className="text-purple-600 font-medium text-sm hover:underline"
>
🚀 View Action Plan
</button>

{/* FULL SCREEN MODAL */}
{open && (

<div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-fade-in">

<div className="max-w-3xl mx-auto p-5">

{/* HEADER */}
<div className="flex items-center justify-between mb-6">

<button
onClick={()=>setOpen(false)}
className="text-blue-600 font-medium"
>
← Back
</button>

<h2 className="text-lg font-bold text-center flex-1">
Action Plan
</h2>

<div className="w-12"></div> {/* spacer */}
</div>

{/* TITLE */}
<h3 className="text-xl font-semibold mb-4 text-purple-700">
{schemeName}
</h3>

{/* LOADING */}
{loading && (
<div className="flex items-center gap-2 text-gray-500">
<div className="w-5 h-5 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
<span>Generating your personalized plan...</span>
</div>
)}

{/* CONTENT */}
{plan && (

<div className="space-y-6 text-sm">

{/* STEPS */}
{plan.steps && (
<div>
<h4 className="font-semibold mb-2 text-lg">🪜 Steps</h4>

<div className="space-y-3">
{plan.steps.map((s,i)=>(
<div key={i} className="flex gap-3">

<div className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">
{i+1}
</div>

<div>
<p className="font-medium">{s.title}</p>
<p className="text-gray-600">{s.description}</p>
</div>

</div>
))}
</div>
</div>
)}

{/* DOCUMENTS */}
{plan.documents && (
<div>
<h4 className="font-semibold mb-2 text-lg">📄 Documents</h4>
<ul className="list-disc ml-5 text-gray-700 space-y-1">
{plan.documents.map((d,i)=>(<li key={i}>{d}</li>))}
</ul>
</div>
)}

{/* TIMELINE */}
{plan.timeline && (
<div>
<h4 className="font-semibold mb-2 text-lg">⏳ Timeline</h4>
<ul className="list-disc ml-5 text-gray-700 space-y-1">
{plan.timeline.map((t,i)=>(<li key={i}>{t}</li>))}
</ul>
</div>
)}

{/* TIPS */}
{plan.tips && (
<div>
<h4 className="font-semibold mb-2 text-lg">💡 Tips</h4>
<ul className="list-disc ml-5 text-gray-700 space-y-1">
{plan.tips.map((tip,i)=>(<li key={i}>{tip}</li>))}
</ul>
</div>
)}

</div>

)}

</div>

</div>

)}

</>

)
}