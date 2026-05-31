import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './context/LanguageContext';

import AuthScreen from './screens/AuthScreen';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ASHAScreen from './screens/ASHAScreen';
import VideoCallScreen from './screens/VideoCallScreen';

export default function App() {
  const { user, loading } = useAuth();
  const { ui } = useLanguage();

  const [activeTab, setActiveTab] = useState('home');
  const [chatInitialMessage, setChatInitialMessage] = useState('');
  const [activeWorker, setActiveWorker] = useState(null);

  function navigateToChat(message = '') {
    setChatInitialMessage(message);
    setActiveTab('chat');
  }

  function navigateToASHA() {
    setActiveTab('asha');
  }

  function startVideoCall(worker) {
    setActiveWorker(worker);
  }

  function endVideoCall() {
    setActiveWorker(null);
  }

  if (loading) {
    return (
      <div className="splash">
        <div className="splash-icon">व</div>
        <p className="splash-name">वैद्या</p>
        <p className="splash-sub">लोड होत आहे...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <>
      <div className="app">
        <header className="header">
          <div className="header-left">
            <div className="brand-icon">व</div>
            <div>
              <h1 className="brand-name">वैद्या</h1>
              <p className="brand-tagline">
                {ui?.tagline || 'तुमची आरोग्य साथी'}
              </p>
            </div>
          </div>

          <div className="header-badge">
            <div className="badge-dot" />
            <span className="badge-text">LIVE</span>
          </div>
        </header>

        <main className="main">
          {activeTab === 'home' && (
            <HomeScreen onNavigateToChat={navigateToChat} />
          )}

          {activeTab === 'chat' && (
            <ChatScreen
              initialMessage={chatInitialMessage}
              onCallASHA={navigateToASHA}
            />
          )}

          {activeTab === 'asha' && (
            <ASHAScreen onStartVideoCall={startVideoCall} />
          )}

          {activeTab === 'history' && (
            <HistoryScreen userId={user.uid} />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen user={user} />
          )}
        </main>

        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>

      {activeWorker && (
        <VideoCallScreen
          worker={activeWorker}
          onEnd={endVideoCall}
        />
      )}
    </>
  );
}