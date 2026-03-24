"use client"

type Scheme = {
  name: string
  description?: string
  eligibility?: string
  benefits?: string
}

export default function CompareSchemes({ schemes }: { schemes: Scheme[] }){

if(!schemes || schemes.length < 2) return null

const [a,b] = schemes

return(

<div className="mt-8 bg-white p-6 rounded-xl shadow">

<h3 className="text-lg font-semibold mb-4">
Compare Top Schemes
</h3>

<div className="grid grid-cols-2 gap-4 text-sm">

{/* Header */}
<div className="font-bold">{a.name}</div>
<div className="font-bold">{b.name}</div>

{/* Description */}
<div>{a.description}</div>
<div>{b.description}</div>

{/* Eligibility */}
<div>
<b>Eligibility:</b> {a.eligibility}
</div>

<div>
<b>Eligibility:</b> {b.eligibility}
</div>

{/* Benefits */}
<div>
<b>Benefits:</b> {a.benefits}
</div>

<div>
<b>Benefits:</b> {b.benefits}
</div>

</div>

</div>

)
}