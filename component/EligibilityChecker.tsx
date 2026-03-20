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
export default function EligibilityChecker({setSchemes, loading, setLoading }: Props){

const [input,setInput] = useState("")

async function findSchemes(){

if(!input) return

setLoading(true)

const res = await fetch("/api/eligibility",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({ userInput: input })
})

const data = await res.json()

setSchemes(data)

setLoading(false)

}

return(

<div className="bg-white p-6 rounded-xl shadow space-y-4">

<h3 className="text-lg font-semibold">
Find Schemes For You
</h3>

<textarea
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Describe yourself (age, job, needs, etc.)"
className="w-full border p-3 rounded-lg h-28"
/>

{/* Example Prompts */}

<div className="text-sm text-gray-500 space-y-1">

<p>Examples:</p>

<ul className="list-disc ml-5">
<li onClick={()=>setInput("I am a student looking for scholarships")} className="cursor-pointer hover:text-blue-600">
I am a student looking for scholarships
</li>

<li onClick={()=>setInput("I am a farmer in Tamil Nadu")} className="cursor-pointer hover:text-blue-600">
I am a farmer in Tamil Nadu
</li>

<li onClick={()=>setInput("I want to start a small business")} className="cursor-pointer hover:text-blue-600">
I want to start a small business
</li>

</ul>

</div>

<button
onClick={findSchemes}
className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
Find Relevant Schemes
</button>

</div>

)
}