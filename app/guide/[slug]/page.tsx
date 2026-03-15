import { supabase } from "@/lib/supabase"
import StepCard from "@/component/StepCard"
import Timeline from "@/component/Timeline"
import Checklist from "@/component/Checklist"
import InfoBox from "@/component/InfoBox"

export default async function GuidePage({ params }) {

const { slug } = await params

const { data, error } = await supabase
.from("guides")
.select("*")
.eq("slug", slug)
.single()

if(error || !data){
return <div className="p-10">Guide not found</div>
}

const guide = data.content_json

return (

<div className="max-w-3xl mx-auto p-6">

<h1 className="text-3xl font-bold mb-6">
{guide.title}
</h1>

{guide.steps?.map((step,index)=>(
<StepCard key={index} step={step} index={index}/>
))}

<Checklist items={guide.documents}/>

<Timeline timeline={guide.timeline}/>

<InfoBox notes={guide.notes}/>

</div>

)

}