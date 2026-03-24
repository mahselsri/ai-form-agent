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
  setWebExplain: (data: any) => void
  
}
export default function ExplainURL({ setWebExplain }: Props){

const [url,setUrl] = useState("")
const [loading,setLoading] = useState(false)

async function explain(){

setLoading(true)
console.log("Url:",url)
const res = await fetch("/api/explain-url",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({url})
})

const data = await res.json()
/*
const saveRes = await fetch("/api/save-guide",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
title:url,
type:"explain",
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

*/
setWebExplain(data)

setLoading(false)

}

return(

<div className="bg-white shadow p-6 rounded-xl mt-6">



<div className="flex gap-3">

<input
className="w-full border p-3 rounded-lg"
placeholder="Paste government website link"
value={url}
onChange={(e)=>setUrl(e.target.value)}
/>

<button
onClick={explain}
className="bg-green-600 text-white px-5 rounded-lg"
>
Explain
</button>

</div>

{loading && <p className="text-sm mt-2">Analyzing page...{url}</p>}

</div>

)

}