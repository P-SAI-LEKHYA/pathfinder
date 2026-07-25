import { useState } from 'react';
import { careers, questions, scoreToTopTwo } from '../data/careers';
import { getChatFollowup, getResultSummary, getCareerNews } from '../api';
import DebuggerTask from './tasks/DebuggerTask';
import FrontendTask from './tasks/FrontendTask';
import InteriorTask from './tasks/InteriorTask';
import ScenarioTask from './tasks/ScenarioTask';

const TASK_COMPONENTS = {
  debugger: DebuggerTask,
  frontend: FrontendTask,
  interior: InteriorTask,
  scenario: ScenarioTask,
};

export default function Quiz() {
  const [stage, setStage] = useState('questions'); // questions -> chat -> task -> result
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [topTwoKeys, setTopTwoKeys] = useState([]);
  const [followup, setFollowup] = useState(null);
  const [chosenKey, setChosenKey] = useState(null);
  const [taskDidWell, setTaskDidWell] = useState(null);
  const [summary, setSummary] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function answerQuestion(option) {
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(option.w)) {
        next[k] = (next[k] || 0) + v;
      }
      return next;
    });

    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      moveToChat();
    }
  }

  async function moveToChat() {
    setStage('chat');
    setLoading(true);
    setError(null);
    const finalScores = { ...scores };
    // recompute including the last answer already merged via setScores above
    const top2 = scoreToTopTwo(finalScores);
    setTopTwoKeys(top2);
    try {
      const data = await getChatFollowup(top2.map((k) => careers[k].name));
      setFollowup(data);
    } catch (err) {
      setError('Could not reach the AI guide — pick a direction below to continue.');
      setFollowup({ question: 'Which sounds more like you?', optionA: careers[top2[0]].name, optionB: careers[top2[1]].name });
    } finally {
      setLoading(false);
    }
  }

  function chooseFinalCareer(index) {
    const key = topTwoKeys[index];
    setChosenKey(key);
    setStage('task');
  }

  async function handleTaskComplete(didWell) {
    setTaskDidWell(didWell);
    setStage('result');
    setLoading(true);
    const career = careers[chosenKey];
    try {
      const [summaryData, newsData] = await Promise.all([
        getResultSummary(career.name, didWell),
        getCareerNews(career.newsQuery),
      ]);
      setSummary(summaryData.summary);
      setNews(newsData.articles || []);
    } catch (err) {
      setSummary(career.reason);
      setNews([]);
      setError('Live data is temporarily unavailable, showing a fallback summary.');
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStage('questions');
    setQIndex(0);
    setScores({});
    setTopTwoKeys([]);
    setFollowup(null);
    setChosenKey(null);
    setTaskDidWell(null);
    setSummary(null);
    setNews([]);
    setError(null);
  }

  return (
    <div className="container">
      <h2>Try It Yourself</h2>
      <div className="card" style={{ marginTop: 24 }}>
        {stage === 'questions' && (
          <div>
            <p style={{ marginBottom: 8, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--teal)' }}>
              Question {qIndex + 1} of {questions.length}
            </p>
            <h3 style={{ marginBottom: 16 }}>{questions[qIndex].q}</h3>
            {questions[qIndex].options.map((opt, i) => (
              <button key={i} className="option" onClick={() => answerQuestion(opt)}>
                {opt.text}
              </button>
            ))}
          </div>
        )}

        {stage === 'chat' && (
          <div>
            {loading && <p>AI guide is thinking...</p>}
            {!loading && followup && (
              <>
                <div style={{ background: 'var(--paper)', borderLeft: '3px solid var(--teal)', padding: '14px 18px', borderRadius: 8, marginBottom: 16 }}>
                  AI Guide: {followup.question}
                </div>
                <button className="option" onClick={() => chooseFinalCareer(0)}>{followup.optionA}</button>
                <button className="option" onClick={() => chooseFinalCareer(1)}>{followup.optionB}</button>
              </>
            )}
            {error && <p style={{ color: 'var(--danger)', marginTop: 12 }}>{error}</p>}
          </div>
        )}

        {stage === 'task' && chosenKey && (() => {
          const career = careers[chosenKey];
          const TaskComponent = TASK_COMPONENTS[career.taskType];
          return <TaskComponent career={career} onComplete={handleTaskComplete} />;
        })()}

        {stage === 'result' && (
          <div>
            {loading && <p>Fetching your personalized result and live news...</p>}
            {!loading && (
              <>
                <div style={{ background: 'var(--navy)', color: 'var(--paper)', padding: 28, borderRadius: 8 }}>
                  <h3 style={{ color: 'var(--amber)' }}>Your Match: {careers[chosenKey].name}</h3>
                  <p style={{ marginTop: 12 }}>{summary}</p>
                </div>

                {news.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontWeight: 'bold', marginBottom: 8 }}>Trending now:</p>
                    {news.slice(0, 3).map((a, i) => (
                      <a key={i} href={a.url} target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: 8, color: 'var(--teal)' }}>
                        {a.title}
                      </a>
                    ))}
                  </div>
                )}
                {error && <p style={{ color: 'var(--danger)', marginTop: 12 }}>{error}</p>}
                <button className="btn" style={{ marginTop: 20 }} onClick={restart}>Try Again</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}