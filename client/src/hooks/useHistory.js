import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export function useHistory() {
  async function createConversation({ userId, firstUserMessage, language }) {
    if (!userId || !firstUserMessage) return null;

    const ref = await addDoc(collection(db, 'users', userId, 'conversations'), {
      symptom_summary: firstUserMessage.slice(0, 60),
      language: language || 'mr',
      severity: 'LOW',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      messages: [
        {
          role: 'user',
          content: firstUserMessage,
          created_at: new Date().toISOString(),
        },
      ],
    });

    return ref.id;
  }

  async function addMessageToConversation({ userId, conversationId, message, severity }) {
    if (!userId || !conversationId || !message?.content) return;

    const ref = doc(db, 'users', userId, 'conversations', conversationId);

    await updateDoc(ref, {
      severity: severity || 'LOW',
      updated_at: serverTimestamp(),
      messages: arrayUnion({
        role: message.role,
        content: message.content,
        severity: severity || null,
        created_at: new Date().toISOString(),
      }),
    });
  }

  async function getHistory(userId) {
    if (!userId) return [];

    const q = query(
      collection(db, 'users', userId, 'conversations'),
      orderBy('updated_at', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  }

  return {
    createConversation,
    addMessageToConversation,
    getHistory,
  };
}