type Item={
process:string
difficulty:string
time:string
office_visit:string
fees:string
}

export default function ComparisonTable({items}:{items?:Item[]}){

if(!items) return null

return(

<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Process Comparison
</h3>

<div className="overflow-x-auto">

<table className="w-full bg-white shadow rounded-xl">

<thead className="bg-gray-100">

<tr>
<th className="p-3 text-left">Process</th>
<th className="p-3 text-left">Difficulty</th>
<th className="p-3 text-left">Time</th>
<th className="p-3 text-left">Office Visit</th>
<th className="p-3 text-left">Fees</th>
</tr>

</thead>

<tbody>

{items.map((i,index)=>(

<tr key={index} className="border-t">

<td className="p-3">{i.process}</td>
<td className="p-3">{i.difficulty}</td>
<td className="p-3">{i.time}</td>
<td className="p-3">{i.office_visit}</td>
<td className="p-3">{i.fees}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}