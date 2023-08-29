// useSession.js

import { ref } from "vue";
import { useFirestore } from "./useFirestore";

export function useSession() {
  const { data, error, addDocument, getDocuments } = useFirestore("sessions");
  const session = ref({});
  const sessions = ref([]);

  async function createSession(sessionData) {
    try {
      await addDocument(sessionData);
    } catch (err) {
      console.error("Failed to create session:", err);
    }
  }

  async function fetchSessions() {
    try {
      sessions.value = await getDocuments();
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  }

  return {
    session: data,
    sessions,
    sessionError: error,
    createSession,
    fetchSessions,
  };
}
