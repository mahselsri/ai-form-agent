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
import ProcessMeter from "@/component/ProcessMeter"
import ComparisonTable from "@/component/ComparisonTable"
import ExplainURL from "@/component/ExplainURL"
import WebExplainer from "@/component/WebExplainer"
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

type Comparison = {
  process: string
  difficulty: string
  time: string
  office_visit: string
  fees: string
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
  comparison?:Comparison[]
}



export default function Dashboard(){

const [guide, setGuide] = useState<Guide | null>(null)
const [loading,setLoading]=useState(false)
const [webExplain,setWebExplain] = useState(null)
const [activeTab,setActiveTab] = useState("guide")
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
Your intelligent guide for complex processes—college admissions, tax filings, bookings, and beyond.
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
<div className="flex gap-4 mb-6 border-b">

<button
onClick={()=>setActiveTab("guide")}
className={`pb-2 ${
activeTab==="guide"
? "border-b-2 border-blue-600 font-semibold"
: "text-gray-500"
}`}
>
Ask AI Guide
</button>

<button
onClick={()=>setActiveTab("explain")}
className={`pb-2 ${
activeTab==="explain"
? "border-b-2 border-blue-600 font-semibold"
: "text-gray-500"
}`}
>
Explain Website
</button>

</div>
{/* Search */}

{activeTab==="guide" && (

<SearchBar
setGuide={setGuide}
loading={loading}
setLoading={setLoading}
/>

)}

{activeTab==="explain" && (

<ExplainURL setWebExplain={setWebExplain}/>

)}

{/* Quick Actions */}
{activeTab==="guide" && (
<QuickActions
setGuide={setGuide}
loading={loading}
setLoading={setLoading}
/>
)}
{/* Loading */}

{loading && (

<div className="mt-10 flex justify-center items-center gap-2 text-gray-500">

<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

<span>Generating your guide...</span>

</div>

)}

{/* Result Section */}

{activeTab==="guide" && guide && !loading && (

<div className="mt-10 space-y-6">

<div className="bg-white rounded-xl shadow-md p-6">

<h2 className="text-2xl font-bold mb-4">
{guide.title}
</h2>
<ProcessMeter
difficulty={guide.difficulty}
estimated_time={guide.estimated_time}
office_visit={guide.office_visit}
/>

<ComparisonTable items={guide.comparison} />

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

{activeTab==="explain" && webExplain && !loading && (

<WebExplainer data={webExplain}/>

)}

</div>

)
}