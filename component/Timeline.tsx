export default function Timeline({ timeline = [] }) {

if(!timeline || timeline.length === 0) return null

return(

<div className="mt-6">

<h3 className="font-semibold mb-3">
Process Timeline
</h3>

<div className="space-y-3">

{timeline.map((item,i)=>(

<div key={i} className="flex items-center">

<div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>

<div>

<p className="font-medium">
{item.stage}
</p>

<p className="text-sm text-gray-500">
{item.duration}
</p>

</div>

</div>

))}

</div>

</div>

)

}