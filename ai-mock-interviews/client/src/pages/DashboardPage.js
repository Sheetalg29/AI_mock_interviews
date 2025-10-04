import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage({ userId }) {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    api.get(`/dashboard/${userId}`).then(res => setInterviews(res.data.interviews));
  }, [userId]);

  return (
    <div>
      <h2>Performance Dashboard</h2>
      {interviews.length === 0 && <p>No interviews yet.</p>}
      {interviews.map((iv, idx) => (
        <div key={idx} style={{marginBottom: "2em", padding: "1em", border: "1px solid #eee"}}>
          <h4>Interview on {new Date(iv.date).toLocaleDateString()}</h4>
          <div>
            <strong>Coding:</strong> {iv.performance.coding}
            <br />
            <strong>Concepts:</strong> {iv.performance.concepts}
            <br />
            <strong>Communication:</strong> {iv.performance.communication}
            <br />
            <strong>Emotions:</strong> {iv.performance.emotions}
            <br />
            <strong>Total Score:</strong> {iv.score}
            <br />
            <strong>Feedback:</strong> {iv.feedback}
            <br />
            <strong>Emotion Snapshots:</strong>
            <ul>
              {iv.emotionSnapshots?.map((snap, i) => (
                <li key={i}>
                  <img src={snap.imageData} alt="Snapshot" width={50} />
                  {snap.detectedEmotion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}