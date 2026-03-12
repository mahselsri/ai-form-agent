"use client"

import { useState } from "react"

import SearchBar from "@/component/SearchBar"
import QuickActions from "@/component/QuickActions"
import ActiveProcesses from "@/component/ActiveProcesses"

import StepCard from "@/component/StepCard"
import Timeline from "@/component/Timeline"
import Checklist from "@/component/Checklist"
import InfoBox from "@/component/InfoBox"

export default function Dashboard(){

const [guide,setGuide] = useState(null)
const [loading,setLoading]=useState(false)

return(

<div>

<h1 className="text-3xl font-bold mb-6">
Dashboard
</h1>

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



{/* Loading Indicator */}
{loading && (
<div className="mt-6 flex items-center gap-2 text-gray-500">
<span className="animate-spin">⏳</span>
Generating your guide...
</div>
)}

{/* Guide Result */}
{guide && !loading && (

<div className="mt-8">

<h2 className="text-2xl font-bold mb-6">
{guide.title}
</h2>

{guide.steps?.map((step, index)=>(
<StepCard key={index} step={step} index={index}/>
))}

<Checklist items={guide.documents}/>

<Timeline timeline={guide.timeline}/>

<InfoBox notes={guide.notes}/>

</div>

)}

</div>

)
}