import firebase from "firebase/app";
import { IDesks } from "./interfaces/IDesks";

export const createDesk = async (name: string) => {
  const db = firebase.firestore();

  const docRef = await db.collection("desks").add({
    name,
  });

  const doc = await docRef.get();

  const data = doc.data();

  return { ...data, id: doc.id } as IDesks;
};

export const getDesks = async () => {
  const db = firebase.firestore();

  const querySnapshot = await db.collection("desks").get();

  const desks: IDesks[] = [];

  querySnapshot.forEach((desk) => {
    desks.push({
      id: desk.id,
      name: desk.data().name,
    });
  });

  return desks;
};

export const deleteDesk = async (id: string) => {
  const db = firebase.firestore();

  await db.collection("desks").doc(id).delete();
};
