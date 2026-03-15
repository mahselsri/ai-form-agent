"use client"
type StoryNode = {
  stage:string
  description:string
  emotion:string
}

type Guide = {
  title: string
  steps?: any[]
  documents?: any[]
  timeline?: any[]
  notes?: string[]
  slug?:string
  followups?: string[]
  story?: StoryNode[]
  difficulty?: string
  estimated_time?: string
  office_visit?: string

}

type Props = {
  setGuide: (guide: Guide) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}
export default function QuickActions({ setGuide, loading, setLoading }: Props){

async function askAI(query:any){

setLoading(true)

try{

const res = await fetch("/api/chat",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ message: query })
})

const data = await res.json()



const saveRes = await fetch("/api/save-guide",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
title:data.title,
content:data
})
})
const saved = await saveRes.json()
console.log("Saved:", saved)

// 3️⃣ attach slug
const guideWithSlug = {
...data,
slug:saved.slug
}
setGuide(guideWithSlug )
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