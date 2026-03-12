import { Home, FileText, Folder, Settings } from "lucide-react";

export default function Sidebar(){

return(

<div className="w-64 h-screen bg-white border-r p-6">

<h2 className="text-xl font-bold mb-8">
AI Life Admin
</h2>

<nav className="space-y-4">

<a className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
<Home size={20}/>
Dashboard
</a>

<a className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
<FileText size={20}/>
Guides
</a>

<a className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
<Folder size={20}/>
My Processes
</a>

<a className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
<Settings size={20}/>
Settings
</a>

</nav>

</div>

)
}