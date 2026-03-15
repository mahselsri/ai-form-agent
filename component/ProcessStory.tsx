"use client"
type StoryNode = {
 stage:string
 description:string
 emotion:string
}
type ProcessStoryProps = {
  story?: StoryNode[]
}
export default function ProcessStory({ story }:ProcessStoryProps) {

if(!story || story.length === 0) return null

const icons: Record<string,string> = {
start:"🚀",
action:"📝",
check:"📄",
verify:"🏢",
success:"🎉"
}

return(

<div className="mt-10">

<h3 className="text-xl font-semibold mb-6">
Your Journey
</h3>

<div className="space-y-6">

{story.map((s: StoryNode, i: number)=>(

<div key={i} className="flex items-start gap-4">

<div className="text-2xl">
{icons[s.emotion] || "➡️"}
</div>

<div className="bg-white shadow rounded-lg p-4 w-full">

<h4 className="font-semibold">
{s.stage}
</h4>

<p className="text-gray-600 text-sm mt-1">
{s.description}
</p>

</div>

</div>

))}

</div>

</div>

)

}