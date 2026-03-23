"use client"

import { useState } from "react"

type Props = {
  title: string
  content: any
  type: "guide" | "schemes" | "explain" | "eligiblity"
}

export default function ShareButton({ title, content, type }: Props){

const [loading,setLoading] = useState(false)

async function handleShare(){

try{

setLoading(true)

const res = await fetch("/api/save-guide",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body: JSON.stringify({
    title,
    content,
    type
  })
})

const data = await res.json()

const url = `${window.location.origin}/guide/${data.slug}`

await navigator.clipboard.writeText(url)

alert("Share link copied 🚀")

}catch(err){
console.error(err)
alert("Failed to share")
}

setLoading(false)

}

return(

<button
onClick={handleShare}
disabled={loading}
className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
>

{loading ? (
<>
<span className="animate-spin">⏳</span>
Sharing...
</>
) : (
"🔗 Share"
)}

</button>

)
}