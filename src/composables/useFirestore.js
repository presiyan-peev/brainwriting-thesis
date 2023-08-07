// useFirestore.js

import { ref } from "vue";
import { db, collection } from "../../firebaseInit"; // Assuming you've set up Firebase in a file

export function useFirestore(collectionName) {
  const data = ref([]);
  const error = ref(null);

  const collectionRef = collection(db, "sessions");

  async function addDocument(doc) {
    try {
      await collectionRef.add(doc);
    } catch (err) {
      error.value = err.message;
    }
  }

  async function getDocuments() {
    try {
      const querySnapshot = await collectionRef.get();
      data.value = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (err) {
      error.value = err.message;
    }
  }

  return { data, error, addDocument, getDocuments };
}
