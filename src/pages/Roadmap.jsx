import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RoadMapVisual from '../components/RoadMapVisual';

const SESSION_KEY = 'pathfinder_discovery';

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Roadmap() {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(() => loadSession());

  useEffect(() => {
    setSession(loadSession());
  }, [searchParams]);

  const careerParam = searchParams.get('career') || '';

  const roadmap = useMemo(() => {
    if (!session) return null;
    if (session.roadmap && (!careerParam || session.roadmap.careerName === careerParam)) {
      return session.roadmap;
    }
    if (careerParam && session.paths?.[careerParam]) return session.paths[careerParam];
    if (session.roadmap) return session.roadmap;
    return null;
  }, [session, careerParam]);

  if (!roadmap?.stops?.length) {
    return (
      <div className="page-wrapper roadmap-page">
        <section className="page-intro">
          <div className="container" style={{ maxWidth: 880 }}>
            <p className="brand-mark">PathFinder</p>
            <h1>Your career road</h1>
            <p className="page-intro-lead">
              Finish a conversation in{' '}
              <Link to="/finder" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Career Finder
              </Link>{' '}
              first. The AI builds a personalized road from what you said.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper roadmap-page">
      <section className="page-intro">
        <div className="container" style={{ maxWidth: 880 }}>
          <p className="brand-mark">PathFinder</p>
          <h1>Your career road</h1>
          <p className="page-intro-lead">
            Generated from your live chat — tap a stop on the road to read what to do next.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 880 }}>
        <div className="road-heading">
          {roadmap.tag && <p className="match-tag">{roadmap.tag}</p>}
          <h2>{roadmap.careerName}</h2>
          {roadmap.salary && <p className="match-salary">{roadmap.salary}</p>}
          {roadmap.reason && <p className="roadmap-reason">{roadmap.reason}</p>}
          {roadmap.profileSummary && (
            <p className="path-profile-note">From your chat · {roadmap.profileSummary}</p>
          )}
        </div>

        <RoadMapVisual stops={roadmap.stops} careerName={roadmap.careerName} />
      </div>
    </div>
  );
}
