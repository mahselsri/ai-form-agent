export default function InfoBox({ notes = [] }) {

if(notes.length === 0) return null;

return (

<div className="mt-6">

<h3 className="font-semibold mb-3">
Important Notes
</h3>

<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">

<ul className="space-y-2">

{notes.map((note, index)=>(
<li key={index} className="flex items-start">

<span className="mr-2">
⚠️
</span>

<span className="text-gray-700">
{note}
</span>

</li>
))}

</ul>

</div>

</div>

)

}