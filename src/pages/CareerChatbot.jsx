import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendCareerChat } from '../api';

const SESSION_KEY = 'pathfinder_discovery';

const STARTER = {
  message:
    'Hey — I am PathFinder. Tell me what you actually love doing or learning (a hobby counts). I will ask follow-ups from whatever you say, then suggest real career fits.',
};

function toApiHistory(uiMessages) {
  return uiMessages
    .filter((m) => m.sender === 'user' || m.sender === 'bot')
    .map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));
}

export default function CareerChatbot() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: STARTER.message }]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [topThree, setTopThree] = useState(null);
  const [selected, setSelected] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState('');

  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, topThree]);

  function persistSession(nextTop, nextRoadmap, chosenName) {
    const payload = {
      source: 'groq',
      topThree: nextTop,
      selectedName: chosenName || nextTop?.[0]?.name || null,
      roadmap: nextRoadmap,
      paths: nextRoadmap
        ? { [nextRoadmap.careerName]: nextRoadmap }
        : {},
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || isThinking) return;

    setInputText('');
    setError('');
    const withUser = [...messages, { sender: 'user', text }];
    setMessages(withUser);
    setIsThinking(true);

    try {
      const result = await sendCareerChat(toApiHistory(withUser), 'discover');
      setMessages((prev) => [...prev, { sender: 'bot', text: result.message }]);

      if (result.topThree?.length) {
        setTopThree(result.topThree);
        setSelected(result.topThree[0]);
      }
      if (result.roadmap) {
        setRoadmap(result.roadmap);
        persistSession(result.topThree || topThree, result.roadmap, result.roadmap.careerName);
      } else if (result.topThree?.length) {
        persistSession(result.topThree, null, result.topThree[0].name);
      }
    } catch (err) {
      setError(
        'Could not reach the AI counselor. Check that GROQ_API_KEY is set and restart the dev server.'
      );
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I hit a connection issue talking to the counselor service. Please try again in a moment.',
        },
      ]);
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  }

  async function selectCareer(item) {
    setSelected(item);
    setIsThinking(true);
    setError('');

    const ask = [
      ...toApiHistory(messages),
      {
        role: 'user',
        content: `I want to focus on this career: ${item.name}. ${item.why || ''} Please confirm briefly and give me a personalized step-by-step roadmap based on everything I already told you.`,
      },
    ];

    try {
      const result = await sendCareerChat(ask, 'discover');
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `Let's focus on ${item.name}.` },
        { sender: 'bot', text: result.message },
      ]);
      if (result.roadmap) {
        setRoadmap(result.roadmap);
        persistSession(topThree, result.roadmap, item.name);
      } else {
        // Minimal roadmap shell so the map page still works
        const fallback = {
          careerName: item.name,
          salary: item.salary || 'Varies',
          tag: item.tag || 'Match',
          reason: item.why || '',
          profileSummary: 'from live conversation',
          stops: [
            { title: 'Clarify the fit', detail: item.why || `Explore day-to-day work in ${item.name}.` },
            { title: 'Build foundations', detail: `Find introductory courses or mentors for ${item.name}.` },
            { title: 'Practice in public', detail: 'Create a small portfolio piece or real practice hours.' },
            { title: 'Enter the field', detail: 'Apply, audition, freelance, or join an entry role.' },
          ],
        };
        setRoadmap(fallback);
        persistSession(topThree, fallback, item.name);
      }
    } catch (err) {
      setError('Could not build that roadmap right now. Try again.');
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  }

  function handleReset() {
    setMessages([{ sender: 'bot', text: STARTER.message }]);
    setTopThree(null);
    setSelected(null);
    setRoadmap(null);
    setInputText('');
    setError('');
    sessionStorage.removeItem(SESSION_KEY);
  }

  return (
    <div className="page-wrapper discover-page">
      <section className="discover-hero">
        <div className="container discover-hero-inner">
          <p className="brand-mark">PathFinder</p>
          <h1>Talk your way to a career fit</h1>
          <p className="discover-lead">
            Powered by a live AI counselor — not a fixed quiz. Your words shape every reply, the top 3, and the road map.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 760, paddingTop: 0 }}>
        <div className="chat-shell">
          <div className="chat-toolbar">
            <span className="chat-toolbar-label">Live AI counselor</span>
            <button type="button" className="btn-text" onClick={handleReset}>
              Start over
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}
              >
                {msg.text.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}

            {isThinking && (
              <div className="chat-bubble-bot chat-thinking">Thinking with Groq…</div>
            )}

            {error && <p className="form-hint">{error}</p>}

            {topThree && (
              <div className="top-three">
                <p className="top-three-label">Your top 3</p>
                {topThree.map((item, idx) => (
                  <button
                    key={`${item.name}-${idx}`}
                    type="button"
                    className={`top-three-row${selected?.name === item.name ? ' selected' : ''}`}
                    onClick={() => selectCareer(item)}
                  >
                    <span className="rank">#{idx + 1}</span>
                    <span className="top-three-body">
                      <strong>{item.name}</strong>
                      {item.salary && <em>{item.salary}</em>}
                      <span>{item.why}</span>
                    </span>
                  </button>
                ))}
                {roadmap && (
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      navigate(`/roadmap?career=${encodeURIComponent(roadmap.careerName)}`)
                    }
                  >
                    Open road map for {roadmap.careerName}
                  </button>
                )}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-bar">
            <input
              type="text"
              placeholder="Type naturally — e.g. I love dance…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="input-field"
              disabled={isThinking}
            />
            <button type="submit" className="btn" disabled={isThinking || !inputText.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
