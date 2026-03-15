"use client"

export default function FollowUps({ questions, askAI }) {

if(!questions || questions.length === 0) return null

return (

<div className="mt-8">

<h3 className="font-semibold text-lg mb-3">
Ask a follow-up
</h3>

<div className="flex flex-wrap gap-3">

{questions.map((q,i)=>(

<button
key={i}
onClick={()=>askAI(q)}
className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-full hover:bg-blue-100 transition"
>
{q}
</button>

))}

</div>

</div>

)

}