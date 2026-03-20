"use client"

type Scheme = {
  name: string
  description?: string
  eligibility?: string
  benefits?: string
  link?: string
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

{schemes.map((s, i)=>(
  
<div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">

  <h3 className="text-lg font-bold text-green-600 mb-2">
    {s.name}
  </h3>

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