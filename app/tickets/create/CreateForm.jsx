"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { BASE_API_URL } from "../../utils/constants"

export default function CreateForm() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, settype] = useState('low')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e)  => {
    e.preventDefault()
    setIsLoading(true)

    const newTicket = { title, body, type, user_email: 'chris@example.com' }

    const res = await fetch(`${BASE_API_URL}/tickets`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTicket)
    })

    if (res.status === 201) {
      router.refresh()
      router.push('/tickets')
    }
    
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Details:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Type:</span>
        <select 
          onChange={(e) => settype(e.target.value)}
          value={type}
        >
          <option value="Economy Class">Economy Class</option>
          <option value="Business Class">Business Class</option>
          <option value="First Class">First Class</option>
        </select>
      </label>
      <button 
        className="btn-primary" 
        disabled={isLoading}
      >
      {isLoading && <span>Adding...</span>}
      {!isLoading && <span>Add Ticket</span>}
    </button>
    </form>
  )
}
