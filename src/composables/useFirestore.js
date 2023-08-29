import { ref } from "vue";
import {
  db,
  collection,
  addDoc,
  getDoc,
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
    console.log({ id });
    try {
      const docRef = doc(db, "sessions", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      return docSnap.data();
    } catch (err) {
      error.value = "Could not fetch the session";
      console.error("Failed to fetch session: ", err);
    }
  };

  const fetchListOfSessions = async (id) => {
    error.value = null;
    try {
      const docSnap = await getDocs(collection(db, "sessions"));

      return docSnap.docs.map((doc) => doc.data());
    } catch (err) {
      error.value = "Could not fetch the session";
      console.error("Failed to fetch session: ", err);
    }
  };

  // ... other operations ...

  return { error, addSession, fetchListOfSessions, getSession };
}
