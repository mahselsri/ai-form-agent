import { supabase } from "@/lib/supabase"

import StepCard from "@/component/StepCard"
import Timeline from "@/component/Timeline"
import Checklist from "@/component/Checklist"
import InfoBox from "@/component/InfoBox"

import SchemeResults from "@/component/SchemeResults"
import WebExplainer from "@/component/WebExplainer"
import EligibilityChecker from "@/component/EligibilityChecker"

export default async function GuidePage({
  params
}:{
  params: Promise<{ slug: string }>
}){

const { slug } = await params

// ✅ Fetch from DB
const { data, error } = await supabase
.from("guides")
.select("*")
.eq("slug", slug)
.single()

if(error || !data){
  return <div className="p-6">Not found</div>
}

const content = data.content_json
const type = data.type

console.log("Data Type:",data.type)
// 🧠 content can be object OR array
const guide = content

return(

<div className="max-w-4xl mx-auto p-4">

{/* 🔙 Back */}
<a href="/" className="text-blue-600 underline mb-4 inline-block">
← Back to Home
</a>

{/* 🔥 TYPE BASED RENDERING */}

{/* ================= GUIDE ================= */}
{type === "guide" && (

<div>

<h1 className="text-2xl font-bold mb-6">
{guide.title}
</h1>

{guide.steps?.map((step:any,index:number)=>(
<StepCard key={index} step={step} index={index}/>
))}

<Checklist items={guide.documents}/>
<Timeline timeline={guide.timeline}/>
<InfoBox notes={guide.notes}/>

</div>

)}

{/* ================= SCHEMES ================= */}
{type === "schemes" && (

<div>

<h1 className="text-2xl font-bold mb-6">
Recommended Schemes
</h1>

<SchemeResults schemes={guide} />

</div>

)}

{type === "eligibility" && (

<div>

<h1 className="text-2xl font-bold mb-6">
Eligibility
</h1>

<SchemeResults schemes={guide} />

</div>

)}

{/* ================= EXPLAIN ================= */}
{type === "explain" && (

<div>

<WebExplainer data={guide} />

</div>

)}

{/* 🔥 VIRAL CTA */}

<div className="mt-10 p-4 bg-blue-50 rounded-lg text-center">

<p className="mb-2 font-medium">
Want to try this yourself?
</p>

<a
href="/"
className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
>
Try AI Personal Guide 🚀
</a>

</div>

</div>

)
}