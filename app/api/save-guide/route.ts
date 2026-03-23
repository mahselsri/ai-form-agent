import { supabase } from "@/lib/supabase"

export async function POST(req: Request){

    

try{

const body = await req.json()

const { title, content,type } = body

console.log("Save Guide inside:", title)
console.log("Save Guide inside:", content)
console.log("Save type inside:", type)
if(!title || !content){
return Response.json(
{ error:"Missing title or content" },
{ status:400 }
)
}

// Create slug
const slug = title
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-+|-+$/g,"")

// Check if guide already exists
const { data:existing } = await supabase
.from("guides")
.select("slug")
.eq("slug", slug)
.single()

if(existing){
return Response.json({
slug: existing.slug,
message:"Guide already exists"
})
}

// Insert guide
const { data, error } = await supabase
.from("guides")
.insert([
{
slug,
title,
content_json: content,
type:type
}
])
.select()
.single()

if(error){
console.error(error)
return Response.json(
{ error:error.message },
{ status:500 }
)
}

return Response.json({
slug: data.slug
})

}catch(err){

console.error(err)

return Response.json(
{ error:"Server error" },
{ status:500 }
)

}

}