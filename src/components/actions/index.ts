import firebase from "firebase/app";
import { IDesks } from "../../Interfaces/IDesks";

export const createDesk = async (name: string): Promise<IDesks> => {
  const db = firebase.firestore();

  const docRef = await db.collection("desks").add({
    name,
  });

  const doc = await docRef.get();

  const data = doc.data();

  return { ...data, id: doc.id } as IDesks;
};
