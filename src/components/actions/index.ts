import firebase from "firebase/app";
import { IColumns } from "../../Interfaces/IColumns";
import { IDesks } from "../../Interfaces/IDesks";

/* Desks */
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
/* Desks */

/* Columns */
export const getColumns = async (deskId: string) => {
  const db = firebase.firestore();

  const querySnapshot = await db.collection("columns").where("deskId", "==", deskId).get();

  const columns: IColumns[] = [];

  querySnapshot.forEach((doc) => {
    const { deskId, name } = doc.data() as IColumns;

    columns.push({
      id: doc.id,
      deskId,
      name,
    });
  });

  return columns;
};

export const createColumn = async (activeDeskId: string, name: string) => {
  const db = firebase.firestore();

  const docRef = await db.collection("columns").add({
    name,
    deskId: activeDeskId,
  });

  const doc = await docRef.get();

  const data = doc.data();

  return { ...data, id: doc.id } as IColumns;
};

export const deleteColumn = async (id: string) => {
  const db = firebase.firestore();

  await db.collection("columns").doc(id).delete();
};
/* Columns */
