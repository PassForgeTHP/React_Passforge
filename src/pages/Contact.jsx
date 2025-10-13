import { useState } from "react";

export default function Contact() {
    const [email, setEmail]=useState('')
  const [subject, setSubject]=useState('')
  const [content, setContent]=useState('')
  const [status, setStatus]=useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/contacts',{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({email, subject, content})
      })

      const data = await response.json()
      response.ok? setStatus("Message envoyé !"): setStatus(`Erreur : ${data.message || "Impossible d'envoyer le message"}`)
    } catch (error) {
      setStatus(`Erreur réseau : ${error.message}`);
    }
  }
  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Contact</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
              id="email"
              autoComplete="email"
              placeholder="Email" 
              type="email" 
              value={email}
              onChange={e=> setEmail(e.target.value)}
              required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
              id="subject"
              type="text" 
              placeholder="subject" 
              value={subject}
              onChange={e=>setSubject(e.target.value)}
              required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea 
              id="content"
              placeholder="content" 
              value={content}
              onChange={e=>setContent(e.target.value)}
              required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Send</button>
              {status && <p>{status}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
