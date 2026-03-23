"use client"

import { useState } from "react"

type Schemes = {
  name: string
  description?: string[]
  benefits?: string
  links?: string[]
  eligibility?: string

}
type Props = {
  setSchemes: (schemes: Schemes[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}
export default function SchemeFinder({setSchemes, loading, setLoading }: Props){

  const [query,setQuery] = useState("")

  async function search(){
    console.log("scheme query",query)

    if(!query) return

    setLoading(true)


    const res = await fetch("/api/schemes",{
        
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      
      body: JSON.stringify({ message: query })
    })

    const data = await res.json()
    console.log("schema", data);

/*
    const saveRes = await fetch("/api/save-guide",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
title:query,
type:"scheme",
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
    setSchemes(data)

    setLoading(false)
  }

  return(
<div className="bg-white shadow p-6 rounded-xl mt-6">
    <h3 className="font-semibold mb-3">
Search by name, eligibility, or benefit" 
</h3>
    <div className="flex gap-3">

       
      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="e.g. schemes for women entrepreneurs"
        className="w-full border p-3 rounded-lg mb-3"
      />

      <button
onClick={search}
disabled={loading}
className={`px-6 rounded-lg text-white flex items-center gap-2
${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
`}
>

{loading ? (
<>
<span className="animate-spin">⏳</span>
Finding...
</>
) : (
"Find Schemes!"
)}

</button>

    </div>
    </div>

  )
}