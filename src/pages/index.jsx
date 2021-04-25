import React from "react"
import Lolly from "./lolly"
import "./index.css"
import { navigate } from "gatsby";
const IndexPage = () => {
  return (
    <div>
      <div className="title">
      <h1>virtual lollipop</h1>
      <p class="subtitle">because we all know someone who deserves some sugar.</p>
      <div className="lollies">
         <Lolly top="#3c1321" middle="#3c1321" bottom="#3c1321" />
        <Lolly top="#deaa43" middle="#d52358" bottom="#e95946" />
        <Lolly top="#3c1321" middle="#3c1321" bottom="#3c1321" />
        </div>
       
        <button  onClick={()=>navigate(`/LollyGeneration`)} className='new-create-btn'>Create New Lolly</button>
      </div>
      </div>
    
  )
}


export default IndexPage
