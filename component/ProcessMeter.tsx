"use client"

type Props = {
difficulty?: string
estimated_time?: string
office_visit?: string
}

export default function ProcessMeter({
difficulty,
estimated_time,
office_visit
}:Props){

function difficultyColor(){

if(difficulty==="easy") return "bg-green-500"
if(difficulty==="medium") return "bg-yellow-500"
if(difficulty==="hard") return "bg-red-500"

return "bg-gray-400"
}

return(

<div className="grid md:grid-cols-3 gap-4 mb-8">

<div className="bg-white shadow rounded-xl p-4">

<p className="text-sm text-gray-500">
Difficulty
</p>

<div className="flex items-center gap-3 mt-2">

<div className={`w-3 h-3 rounded-full ${difficultyColor()}`}></div>

<span className="font-semibold capitalize">
{difficulty}
</span>

</div>

</div>

<div className="bg-white shadow rounded-xl p-4">

<p className="text-sm text-gray-500">
Estimated Time
</p>

<p className="font-semibold mt-2">
{estimated_time}
</p>

</div>

<div className="bg-white shadow rounded-xl p-4">

<p className="text-sm text-gray-500">
Office Visit Required
</p>

<p className="font-semibold mt-2 capitalize">
{office_visit}
</p>

</div>

</div>

)

}