import React, { useState, useRef } from 'react';
import api from '../services/api';

export default function InterviewPage({ userId }) {
  const [role, setRole] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [interviewId, setInterviewId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [performance, setPerformance] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);

  // Start camera when the interview begins
  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setCameraOn(true);
      } catch (error) {
        alert("Camera is required for emotion analysis. Please allow camera access.");
      }
    }
  };

  // Take snapshot and send to server for emotion analysis
  const captureEmotionSnapshot = async () => {
    if (!cameraOn) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    const res = await api.post('/interview/emotion', { interviewId, imageData });
    alert('Emotion detected: ' + res.data.emotion);
  };

  const fetchQuestions = async () => {
    setFeedback('');
    setPerformance(null);
    await startCamera();
    const res = await api.post('/interview/questions', { role, userId });
    setQuestions(res.data.questions);
    setInterviewId(res.data.interviewId);
    setAnswers(Array(res.data.questions.length).fill(''));
  };

  const handleAnswerChange = (i, val) => {
    const arr = [...answers];
    arr[i] = val;
    setAnswers(arr);
  };

  const submitAnswers = async () => {
    const res = await api.post('/interview/submit', {
      interviewId,
      answers,
    });
    setFeedback(res.data.feedback);
    setPerformance(res.data.performance);
  };

  return (
    <div>
      <h2>Take a Mock Interview (Camera Required)</h2>
      <input
        placeholder="Role (e.g., Frontend Developer)"
        value={role}
        onChange={e => setRole(e.target.value)}
      />
      <button onClick={fetchQuestions} disabled={!role}>Get Interview Questions</button>
      <div>
        <video ref={videoRef} autoPlay playsInline width="320" height="240" />
        {!cameraOn && <p style={{color:"red"}}>Camera access is required to proceed with the interview!</p>}
        {cameraOn && <button onClick={captureEmotionSnapshot}>Capture Emotion Snapshot</button>}
      </div>
      {questions.map((q, i) => (
        <div key={i} style={{ margin: '1em 0' }}>
          <strong>{q}</strong>
          <br />
          <input
            value={answers[i]}
            onChange={e => handleAnswerChange(i, e.target.value)}
            placeholder="Your answer..."
            style={{ width: "80%" }}
          />
        </div>
      ))}
      {questions.length > 0 && (
        <button onClick={submitAnswers} disabled={answers.some(a => !a)}>
          Submit Answers
        </button>
      )}
      {feedback && (
        <div style={{ marginTop: '2em', background: '#f5f5f5', padding: '1em' }}>
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
          {performance && (
            <div>
              <h4>Performance Breakdown:</h4>
              <ul>
                <li><strong>Coding:</strong> {performance.coding}</li>
                <li><strong>Concepts:</strong> {performance.concepts}</li>
                <li><strong>Communication:</strong> {performance.communication}</li>
                <li><strong>Emotions:</strong> {performance.emotions}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}