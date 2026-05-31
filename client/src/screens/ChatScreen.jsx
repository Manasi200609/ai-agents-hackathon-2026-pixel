import ChatWindow from '../components/ChatWindow';
import DatasetStats from '../components/DatasetStats';
import VaidyaAvatar from '../components/VaidyaAvatar';
import { useChat } from '../hooks/useChat';
import { useVoice } from '../hooks/useVoice';

export default function ChatScreen({ initialMessage, onCallASHA }) {
  const { severity, loading } = useChat();
  const { speaking } = useVoice();

  return (
    <div className="screen chat-screen">
      <DatasetStats />

      {/* Avatar */}
      <div className="chat-avatar-wrap">
        <VaidyaAvatar
          speaking={speaking}
          severity={severity}
          thinking={loading}
        />
      </div>

      {/* Chat */}
      <ChatWindow
        initialMessage={initialMessage}
        onCallASHA={onCallASHA}
      />
    </div>
  );
}