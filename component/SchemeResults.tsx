"use client"
import ShareButton from "./ShareButton"
type Scheme = {
  name: string
  description?: string
  eligibility?: string
  benefits?: string
  link?: string
  why_recommended?: string
  score?: number

}

export default function SchemeResults({ schemes }: { schemes: Scheme[] }){

if(!schemes || schemes.length === 0){
  return (
    <div className="text-gray-500 mt-6">
      No schemes found. Try a different description.
    </div>
  )
}

return(

<div className="mt-8 space-y-5">
<ShareButton
  title="Eligiblity Matched"
  content={schemes}
  type="schemes"
/>
{schemes.map((s, i)=>(
  
<div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">

<div className="flex justify-between items-center mb-2">

  <h3 className="text-lg font-bold text-green-600">
    {s.name}
  </h3>

  {s.score !== undefined && (
    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
      ⭐ {s.score}/10
    </span>
  )}

</div>

{/* 🔥 WHY RECOMMENDED */}
{s.why_recommended && (
  <div className="bg-green-50 border-l-4 border-green-500 p-2 text-sm mb-3">
    <b>Why this fits you:</b> {s.why_recommended}
  </div>
)}

<p className="text-gray-600 mb-3">
  {s.description}
</p>

{s.eligibility && (
  <p className="text-sm mb-1">
    <b>👥 Eligibility:</b> {s.eligibility}
  </p>
)}

{s.benefits && (
  <p className="text-sm mb-2">
    <b>💰 Benefits:</b> {s.benefits}
  </p>
)}

{s.link ? (
  <a
    href={s.link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mt-2 text-blue-600 font-medium underline"
  >
    Apply / Learn More →
  </a>
) : (
  <span className="text-gray-400 text-sm">
    Link unavailable
  </span>
)}

</div>

))}

</div>

)
}