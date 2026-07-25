import { useState } from 'react';
import { careers, questions, scoreToTopTwo } from '../data/careers';
import { getChatFollowup, getResultSummary, getCareerNews } from '../api';
import DebuggerTask from './tasks/DebuggerTask';
import FrontendTask from './tasks/FrontendTask';
import InteriorTask from './tasks/InteriorTask';
import ScenarioTask from './tasks/ScenarioTask';
import Compass from '../components/Compass';

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
    const nextScores = { ...scores };
    for (const [k, v] of Object.entries(option.w)) {
      nextScores[k] = (nextScores[k] || 0) + v;
    }
    setScores(nextScores);

    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      moveToChat(nextScores);
    }
  }

  async function moveToChat(finalScores) {
    setStage('chat');
    setLoading(true);
    setError(null);
    const top2 = scoreToTopTwo(finalScores);
    setTopTwoKeys(top2);
    try {
      const data = await getChatFollowup(top2.map((k) => careers[k].name));
      setFollowup(data);
    } catch (err) {
      setFollowup({
        question: `You showed great affinity for both ${careers[top2[0]].name} and ${careers[top2[1]].name}. Which direction excites you more?`,
        optionA: careers[top2[0]].name,
        optionB: careers[top2[1]].name,
      });
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

  // Progress Bar percentage
  const getProgress = () => {
    if (stage === 'questions') return ((qIndex + 1) / questions.length) * 40;
    if (stage === 'chat') return 60;
    if (stage === 'task') return 80;
    return 100;
  };

  return (
    <div className="page-wrapper container" style={{ maxWidth: 900 }}>
      {/* Header & Stepper */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="badge badge-amber" style={{ marginBottom: 12 }}>Interactive Career Lab</span>
        <h2>Discover & Test-Drive Your Path</h2>

        {/* Progress Bar Container */}
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressBar, width: `${getProgress()}%` }} />
        </div>

        {/* Stage Labels */}
        <div style={styles.stepLabelsRow}>
          <span style={{ color: stage === 'questions' ? 'var(--accent-amber)' : 'var(--text-muted)' }}>1. Questions</span>
          <span style={{ color: stage === 'chat' ? 'var(--accent-amber)' : 'var(--text-muted)' }}>2. AI Guide</span>
          <span style={{ color: stage === 'task' ? 'var(--accent-amber)' : 'var(--text-muted)' }}>3. Mini-Task</span>
          <span style={{ color: stage === 'result' ? 'var(--accent-amber)' : 'var(--text-muted)' }}>4. Match Result</span>
        </div>
      </div>

      <div className="card" style={styles.mainCard}>
        {/* STAGE 1: QUESTIONS */}
        {stage === 'questions' && (
          <div>
            <div style={styles.questionHeader}>
              <span className="badge badge-cyan">Question {qIndex + 1} of {questions.length}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Select the option that best fits you
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', margin: '16px 0 24px' }}>{questions[qIndex].q}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {questions[qIndex].options.map((opt, i) => (
                <button key={i} className="option" onClick={() => answerQuestion(opt)}>
                  <span>{opt.text}</span>
                  <span style={{ color: 'var(--accent-amber)' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 2: AI CHAT GUIDE */}
        {stage === 'chat' && (
          <div>
            <div style={styles.aiGuideHeader}>
              <div style={styles.aiAvatar}>🤖</div>
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>PathFinder AI Career Guide</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>Analyzing your preferences...</span>
              </div>
            </div>

            {loading ? (
              <div style={styles.loadingBox}>
                <Compass size={48} />
                <p style={{ marginTop: 16, color: 'var(--text-secondary)' }}>AI Guide is formulating your follow-up question...</p>
              </div>
            ) : followup ? (
              <div style={{ marginTop: 24 }}>
                <div style={styles.aiMessageBubble}>
                  💬 "{followup.question}"
                </div>

                <p style={{ margin: '20px 0 12px', fontWeight: 600, fontSize: '0.95rem' }}>Select your preferred track to unlock your mini-task:</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                  {topTwoKeys.map((key, idx) => {
                    const car = careers[key];
                    return (
                      <div
                        key={key}
                        className="card card-hover"
                        style={{ cursor: 'pointer', padding: 20, border: '1px solid rgba(255, 158, 59, 0.3)' }}
                        onClick={() => chooseFinalCareer(idx)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                          <span style={{ fontSize: '1.8rem' }}>{car.icon}</span>
                          <div>
                            <h4 style={{ fontSize: '1.1rem' }}>{car.name}</h4>
                            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{car.tag}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{car.reason}</p>
                        <button className="btn" style={{ width: '100%', padding: '10px 14px', fontSize: '0.85rem' }}>
                          Select {car.name} →
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* STAGE 3: MINI TASK */}
        {stage === 'task' && chosenKey && (() => {
          const career = careers[chosenKey];
          const TaskComponent = TASK_COMPONENTS[career.taskType];
          return (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '2rem' }}>{career.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.3rem' }}>{career.name} Workstation</h3>
                    <span className="badge badge-emerald">Hands-On Mini Task</span>
                  </div>
                </div>
                <img src={career.image} alt={career.name} style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 8 }} />
              </div>

              <div style={{ background: 'rgba(9, 13, 22, 0.6)', padding: 20, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <TaskComponent career={career} onComplete={handleTaskComplete} />
              </div>
            </div>
          );
        })()}

        {/* STAGE 4: RESULT */}
        {stage === 'result' && (
          <div>
            {loading ? (
              <div style={styles.loadingBox}>
                <Compass size={48} />
                <p style={{ marginTop: 16, color: 'var(--text-secondary)' }}>Calculating career match report & fetching live market trends...</p>
              </div>
            ) : chosenKey && careers[chosenKey] ? (
              <div>
                {/* Hero Result Banner */}
                <div className="card" style={styles.resultHeroCard}>
                  <div style={styles.resultHeroGrid}>
                    <img src={careers[chosenKey].image} alt={careers[chosenKey].name} style={styles.resultImage} />
                    <div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                        <span className="badge badge-emerald">96% Career Match</span>
                        <span className="badge badge-amber">{careers[chosenKey].tag}</span>
                      </div>

                      <h2 style={{ fontSize: '2rem', marginBottom: 12 }}>
                        {careers[chosenKey].icon} {careers[chosenKey].name}
                      </h2>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 16 }}>
                        {summary}
                      </p>

                      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Salary Range</span>
                          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                            {careers[chosenKey].salary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live News Trending Section */}
                {news.length > 0 && (
                  <div style={{ marginTop: 36 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: 16 }}>
                      📈 Trending Market News for {careers[chosenKey].name}:
                    </h3>

                    <div style={{ display: 'grid', gap: 16 }}>
                      {news.slice(0, 3).map((a, i) => (
                        <a key={i} href={a.url} target="_blank" rel="noreferrer" className="card card-hover" style={{ padding: 18, display: 'block', textDecoration: 'none' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{a.source}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(a.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{a.title}</h4>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 32, textAlign: 'center' }}>
                  <button className="btn" onClick={restart} style={{ padding: '14px 36px' }}>
                    🔄 Try Another Career Path
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  progressTrack: {
    width: '100%',
    height: 8,
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 9999,
    margin: '20px 0 10px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-cyan))',
    transition: 'width 0.4s ease',
  },
  stepLabelsRow: {
    display: 'flex',
    justify: 'space-between',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  mainCard: {
    background: 'rgba(18, 24, 39, 0.8)',
    padding: '36px',
  },
  questionHeader: {
    display: 'flex',
    justify: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  aiGuideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  aiAvatar: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    background: 'rgba(6, 182, 212, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    fontSize: '1.6rem',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '48px 24px',
  },
  aiMessageBubble: {
    background: 'rgba(6, 182, 212, 0.12)',
    borderLeft: '4px solid var(--accent-cyan)',
    padding: '18px 24px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
  },
  resultHeroCard: {
    background: 'linear-gradient(135deg, rgba(18, 24, 39, 0.95), rgba(16, 185, 129, 0.1))',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    padding: 32,
  },
  resultHeroGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 28,
    alignItems: 'center',
  },
  resultImage: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
    borderRadius: 14,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
};