// JAVA SCRIPT XML

import { useState } from "react"
import axios from "axios"
import "./App.css"

function App(){ // component name should start with capital letter
  // it contains state instead of variable

  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(event){ // event is an object (object means key:value pair)
    // console.log(event.target.value)
    setPrompt(event.target.value)
  }

  async function generateResponse(event){
    setLoading(true)
    const res = await axios.post("http://127.0.0.1:8000/generate", { prompt: prompt })
    setResponse(res.data.response)
    setLoading(false)
  }

  console.log(response)

  return(
    <div className="container">
      <h1>Full Stack AI Integration</h1>

      <textarea onChange={handleChange} placeholder="Enter your prompt"></textarea>
      <button onClick={generateResponse}>{ loading ? "Generating...." : "Generate" }</button>

      <div className="response-box">
        <h2>Ai Response</h2>
        <p>{ response }</p>
      </div>
    </div>

  )
}

export default App