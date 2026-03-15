"use client"

import { useState } from "react"
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
export default function SearchBar({ setGuide, loading, setLoading }: Props){

const [query,setQuery] = useState("")

async function askAI(){

if(!query.trim()) return

console.log("Sending:", query)

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

return(

<div className="bg-white shadow-md p-6 rounded-xl">

<div className="flex gap-3">

<input
className="w-full border rounded-lg p-4"
placeholder="Ask anything about Indian processes..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

<button
onClick={askAI}
disabled={loading}
className={`px-6 rounded-lg text-white flex items-center gap-2
${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
`}
>

{loading ? (
<>
<span className="animate-spin">⏳</span>
Thinking...
</>
) : (
"Ask"
)}

</button>

</div>

</div>

)
}