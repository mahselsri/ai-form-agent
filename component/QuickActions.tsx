"use client"

export default function QuickActions({ setGuide, loading, setLoading }){

async function askAI(query){

setLoading(true)

try{

const res = await fetch("/api/chat",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ message: query })
})

const data = await res.json()

setGuide(data)

}catch(err){

console.error("AI Error:",err)

}finally{

setLoading(false)

}

}

const actions=[
"Apply Passport",
"File Income Tax",
"GST Registration",
"Property Registration"
]

return(

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

{actions.map((a,i)=>(

<div
key={i}
onClick={()=>!loading && askAI(a)}
className={`bg-white p-4 rounded-xl shadow transition flex items-center justify-center
${loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg cursor-pointer"}
`}
>

<h3 className="font-semibold flex items-center gap-2">

{loading ? (
<>
<span className="animate-spin">⏳</span>
Loading...
</>
) : (
a
)}

</h3>

</div>

))}

</div>

)

}