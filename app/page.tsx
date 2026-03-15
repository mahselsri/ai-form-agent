"use client"

import { useState } from "react"

import SearchBar from "@/component/SearchBar"
import QuickActions from "@/component/QuickActions"
import ActiveProcesses from "@/component/ActiveProcesses"

import StepCard from "@/component/StepCard"
import Timeline from "@/component/Timeline"
import Checklist from "@/component/Checklist"
import InfoBox from "@/component/InfoBox"
import FollowUps from "@/component/FollowUps"
import ProcessStory from "@/component/ProcessStory"

type Step = {
  title: string
  description: string
}

type Documents = {
  name: string
  description?: string
}

type TimelineItem = {
  stage: string
  duration: string
}

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

}

export default function Dashboard(){

const [guide, setGuide] = useState<Guide | null>(null)
const [loading,setLoading]=useState(false)

return(

<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

{/* Header */}

<header className="border-b bg-white sticky top-0 z-10">
<div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">

<h1 className="text-xl font-bold text-blue-600">
AI Personal Guide
</h1>

</div>
</header>

{/* Main Container */}

<div className="max-w-4xl mx-auto px-4 py-10">

{/* Hero Section */}

<div className="text-center mb-8">

<h2 className="text-3xl md:text-4xl font-bold mb-3">
Your AI Guide for any Process, procedure, directions ex college admission, booking, form filling, tax process, anything you need try it!
</h2>

<p className="text-gray-600">
Information At Your Finger Tips.
</p>




<button
className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
onClick={()=>{
if(!guide?.slug) return
const url = `${window.location.origin}/guide/${guide.slug}`


navigator.clipboard.writeText(url)

alert("Guide link copied!!!")

}}
>
Share Guide
</button>


</div>
{/* Search */}

<SearchBar
setGuide={setGuide}
loading={loading}
setLoading={setLoading}
/>

{/* Quick Actions */}

<QuickActions
setGuide={setGuide}
loading={loading}
setLoading={setLoading}
/>

{/* Loading */}

{loading && (

<div className="mt-10 flex justify-center items-center gap-2 text-gray-500">

<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

<span>Generating your guide...</span>

</div>

)}

{/* Result Section */}

{guide && !loading && (

<div className="mt-10 space-y-6">

<div className="bg-white rounded-xl shadow-md p-6">

<h2 className="text-2xl font-bold mb-4">
{guide.title}
</h2>

</div>

{/* Steps */}
<ProcessStory story={guide.story}/>
<div className="bg-white rounded-xl shadow-md p-6">

<h3 className="font-semibold mb-4 text-lg">
Steps
</h3>

{guide.steps?.map((step,index)=>(
<StepCard key={index} step={step} index={index}/>
))}

</div>

{/* Documents */}

<div className="bg-white rounded-xl shadow-md p-6">

<Checklist items={guide.documents}/>

</div>

{/* Timeline */}

<div className="bg-white rounded-xl shadow-md p-6">

<Timeline timeline={guide.timeline}/>

</div>

{/* Notes */}

<div className="bg-white rounded-xl shadow-md p-6">

<InfoBox notes={guide.notes}/>
<FollowUps
questions={guide.followups}
askAI={(q)=>{
setLoading(true)

fetch("/api/chat",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ message: q })
})
.then(res=>res.json())
.then(data=>{
setGuide(data)
setLoading(false)
})

}}
/>
</div>

</div>

)}

</div>

</div>

)
}