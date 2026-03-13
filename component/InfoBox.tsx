export default function InfoBox({ notes = [] }: { notes?: string[] }) {

if(!notes || notes.length === 0) return null

return(

<div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">

<h3 className="font-semibold mb-2">
Important Notes
</h3>

<ul className="list-disc ml-5 text-sm text-gray-700">

{notes.map((note,i)=>(

<li key={i}>
{note}
</li>

))}

</ul>

</div>

)

}