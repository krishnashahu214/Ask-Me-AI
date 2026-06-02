// // JAVA SCRIPT XML

// import { useState } from "react"
// import axios from "axios"
// import "./App.css"
// const API_URL = import.meta.env.VITE_API_URL;

// function App(){ // component name should start with capital letter
//   // it contains state instead of variable

//   const [prompt, setPrompt] = useState("")
//   const [response, setResponse] = useState("")
//   const [loading, setLoading] = useState(false)

//   function handleChange(event){ // event is an object (object means key:value pair)
//     // console.log(event.target.value)
//     setPrompt(event.target.value)
//   }

//   async function generateResponse(event){
//     setLoading(true)
//     const res = await axios.post("${API_URL}/generate", { prompt: prompt })
//     setResponse(res.data.response)
//     setLoading(false)
//   }

//   console.log(response)

//   return(
//     <div className="container">
//       <h1>Full Stack AI Integration</h1>

//       <textarea onChange={handleChange} placeholder="Enter your prompt"></textarea>
//       <button onClick={generateResponse}>{ loading ? "Generating...." : "Generate" }</button>

//       <div className="response-box">
//         <h2>Ai Response</h2>
//         <p>{ response }</p>
//       </div>
//     </div>

//   )
// }

// export default App



import { useState } from "react"
import axios from "axios"
import "./App.css"

const API_URL = import.meta.env.VITE_API_URL;

function App() { 
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(event) { 
    setPrompt(event.target.value)
  }

  async function generateResponse() {
    if (!prompt.trim()) return alert("Please enter a prompt first!"); // Khali prompt rokne ke liye
    
    setLoading(true)
    try {
      // FIX: Yahan backticks (`) use kiye hain double quotes ki jagah
      const res = await axios.post(`${API_URL}/generate`, { prompt: prompt })
      setResponse(res.data.response)
    } catch (error) {
      console.error("Error generating response:", error)
      setResponse("Oops! Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Full Stack AI Integration</h1>

      <textarea onChange={handleChange} placeholder="Enter your prompt"></textarea>
      {/* Loading state mein button ko disable karna achhi practice hai */}
      <button onClick={generateResponse} disabled={loading}>
        { loading ? "Generating...." : "Generate" }
      </button>

      <div className="response-box">
        <h2>AI Response</h2>
        <p>{ response }</p>
      </div>
    </div>
  )
}

export default App