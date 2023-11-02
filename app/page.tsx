"use client"
import { useState } from "react"
import axios from 'axios'
export default function Home() {

  const [url,seturl]= useState("")
  const [ans,setans]= useState("");
  const [loading,setloading] = useState(false)
  const handle =async ()=>{
        setloading(true)
       const res = await axios.post("/api/create",{url});
       const ansi = await res.data
      
       setans(ansi);
       
       setloading(false)

  }
  return (<>
    <div className='text-5xl text-black text-center mt-11  '>      URL DADDY</div>
    <div className="flex flex-col items-center justify-center  mt-11">
   
    <input type="text" id="email"  placeholder="URL" 
     onChange={(e)=>{seturl(e.target.value)}}
    className=" m-4 text-black p-2 border border-gray-400 rounded-lg  focus:outline-none focus:border-gray-700" />
    <button  onClick={handle}
    className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-700" > {loading===true?<>loading...</>:<>press me</>}</button>
    {ans===""?<div className="text-xl">PLS ENTER THE INPUT </div>:<div>{ans==='enter valid url'?<div className="text-xl">the URL provided is wrong</div>:<div><a className="text-3xl text-blue-500 hover:text-black" href={`${ans}`}> ({ans})</a></div>}</div>
    }
   
  </div></>
  )
}
