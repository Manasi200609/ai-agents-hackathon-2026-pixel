import { useLanguage } from '../context/LanguageContext';

export default function BottomNav({ active, onChange }) {
  const { ui } = useLanguage();

  const TABS = [
    { id: 'home',    icon: '🏠', label: ui.greeting?.split(' ')[0] || 'मुख्यपान' },
    { id: 'chat',    icon: '💬', label: 'Chat' },
    { id: 'asha',    icon: '👩‍⚕️', label: 'ASHA' },
    { id: 'history', icon: '📋', label: ui.history?.split(' ')[0] || 'इतिहास' },
    { id: 'profile', icon: '👤', label: ui.profile?.split(' ')[0] || 'प्रोफाइल' },
  ];

  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
          {active === tab.id && <div className="nav-indicator" />}
        </button>
      ))}
    </nav>
  );
}