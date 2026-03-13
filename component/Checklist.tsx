type Document = {
  name: string
  description?: string
}

export default function Checklist({ items = [] }: { items?: Document[] }) {

if(!items || items.length === 0) return null

return(

<div className="mt-6">

<h3 className="font-semibold mb-3">
Required Documents
</h3>

<div className="space-y-3">

{items.map((doc,i)=>(

<div key={i} className="flex items-start">

<div className="text-green-600 mr-2">
✔
</div>

<div>

<p className="font-medium">
{doc.name}
</p>

{doc.description && (

<p className="text-sm text-gray-500">
{doc.description}
</p>

)}

</div>

</div>

))}

</div>

</div>

)

}