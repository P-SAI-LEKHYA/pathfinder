import { useState, useRef, useEffect } from 'react';
import { sendCareerChat } from '../api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Ask anything about careers, training, or next steps. I stay on professional topics only.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  function toHistory(ui) {
    return ui.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userText = input.trim();
    setInput('');
    const withUser = [...messages, { sender: 'user', text: userText }];
    setMessages(withUser);
    setIsTyping(true);

    try {
      const result = await sendCareerChat(toHistory(withUser), 'assist');
      setMessages((prev) => [...prev, { sender: 'bot', text: result.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I could not reach the counselor right now. Please try again shortly.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      <button
        className="floating-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open career assist"
      >
        {isOpen ? '×' : '?'}
      </button>

      {isOpen && (
        <div className="floating-chat-drawer">
          <div className="widget-header">
            <div>
              <h4>PathFinder Assist</h4>
              <span>Live AI · careers only</span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} className="btn-text">
              Close
            </button>
          </div>
          <div className="widget-body">
            {messages.map((m, i) => (
              <div key={i} className={m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                {m.text}
              </div>
            ))}
            {isTyping && <div className="chat-bubble-bot chat-thinking">Thinking…</div>}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={handleSend} className="widget-footer">
            <input
              type="text"
              placeholder="Ask about a career…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field"
              disabled={isTyping}
            />
            <button type="submit" className="btn" disabled={isTyping || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
