export default function StepCard({ step = {}, index = 0 }) {

return(

<div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">

<div className="flex items-start">

<div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
{index + 1}
</div>

<div className="flex-1">

<h3 className="font-semibold text-lg">
{step.title || "Step"}
</h3>

<p className="text-gray-600 mt-1">
{step.description || ""}
</p>

{/* Step Links */}

{step.links && step.links.length > 0 && (

<div className="mt-3 space-y-2">

{step.links.map((link,i)=>(

<a
key={i}
href={link.url}
target="_blank"
rel="noopener noreferrer"
className="block text-blue-600 text-sm hover:underline"
>

🔗 {link.title}

{link.description && (
<span className="text-gray-500 text-xs block">
{link.description}
</span>
)}

</a>

))}

</div>

)}

</div>

</div>

</div>

)

}