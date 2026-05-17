import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'

const QUICK_PROMPTS = [
  "Explain React hooks to a beginner",
  "How to build a FastAPI backend?",
  "What's the difference between SQL and NoSQL?",
  "How do I center a div in CSS?"
]

export default function AiChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleAsk(e, q = null) {
    if (e) e.preventDefault()

    const query = q || input
    if (!query.trim()) return

    const userMessage = { role: 'user', text: query }
    const newMessages = [...messages, userMessage]
    
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await client.post('/ai/ask', { messages: newMessages })
      setMessages([...newMessages, { role: 'model', text: res.data.answer }])
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-layout">
      <Link to="/students" className="ai-back-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back
      </Link>

      <div className="ai-card">
        <div className="ai-header-sparkles">✨</div>
        <h2 className="ai-title">AI Study Assistant</h2>
        <p className="ai-subtitle">Ask anything about programming and web development</p>

        {messages.length === 0 && (
          <div className="ai-quick-prompts">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                className="ai-prompt-btn"
                onClick={() => handleAsk(null, prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.length > 0 && (
          <div className="ai-chat-history" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {messages.map((msg, idx) => (
              msg.role === 'model' ? (
                <div key={idx} className="ai-response-box" style={{ margin: 0 }}>
                  <div className="ai-response-header">
                    <span className="ai-response-icon">🤖</span>
                    <span>Gemini</span>
                  </div>
                  <div className="ai-response-content">{msg.text}</div>
                </div>
              ) : (
                <div key={idx} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--primary-color, #4f46e5)', color: 'white', padding: '0.75rem 1.25rem', borderRadius: '1rem', borderBottomRightRadius: '0.25rem', maxWidth: '85%' }}>
                  {msg.text}
                </div>
              )
            ))}
            {loading && (
              <div className="ai-response-box" style={{ margin: 0, alignSelf: 'flex-start', padding: '0.75rem' }}>
                <span className="ai-spinner" style={{ display: 'inline-block', borderColor: 'var(--primary-color, #4f46e5)', borderRightColor: 'transparent', width: '20px', height: '20px', borderWidth: '3px' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {error && (
          <div className="ai-alert ai-alert-error" style={{marginBottom: '10px'}}>{error}</div>
        )}

        <form onSubmit={handleAsk} className="ai-form">
          <div className="ai-input-wrapper">
            <textarea
              className="ai-input"
              placeholder="Type your question here..."
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={2}
              maxLength={1000}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk(e);
                }
              }}
            />
            <button
              type="submit"
              className="ai-submit-btn"
              disabled={loading || !input.trim()}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}