import { ref } from "vue";
import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
} from "../../firebaseInit";

export function useFirestore() {
  const error = ref(null);

  const addSession = async ({ id, session }) => {
    error.value = null;

    try {
      console.log({ session, id });
      const docRef = await setDoc(doc(db, "sessions", id.toString()), session);
      console.log({ docRef });
      return id;
    } catch (err) {
      error.value = "Could not save the session";
      console.error("Failed to add session: ", err);
    }
  };

  const getSession = async (id) => {
    error.value = null;

    try {
      const sessionDoc = doc(db, "sessions", id);
      const docSnap = await getDocs(sessionDoc);

      if (!docSnap.exists()) {
        throw new Error("Session does not exist");
      }

      return docSnap.data();
    } catch (err) {
      error.value = "Could not fetch the session";
      console.error("Failed to fetch session: ", err);
    }
  };

  // ... other operations ...

  return { error, addSession, getSession };
}
