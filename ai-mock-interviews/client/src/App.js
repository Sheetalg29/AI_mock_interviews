import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import InterviewPage from './pages/InterviewPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <LoginPage setUser={setUser} />;

  return (
    <div>
      <h1>AI Mock Interview Platform</h1>
      <InterviewPage userId={user.userId} />
      <hr />
      <DashboardPage userId={user.userId} />
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default App;
