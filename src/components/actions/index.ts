import firebase from "firebase/app";
import { ICards } from "../../Interfaces/ICards";
import { IColumns } from "../../Interfaces/IColumns";
import { IDesks } from "../../Interfaces/IDesks";

/* Desk */
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
/* Desk */

/* Column */
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
/* Column */

/* Card */
export const getCards = async (columnId: string) => {
  const db = firebase.firestore();

  const querySnapshot = await db.collection("cards").where("columnId", "==", columnId).get();

  const cards: ICards[] = [];

  querySnapshot.forEach((doc) => {
    const { columnId, name } = doc.data() as ICards;

    cards.push({
      id: doc.id,
      columnId,
      name,
    });
  });

  return cards;
};

export const createCard = async (columnId: string, name: string) => {
  const db = firebase.firestore();

  const docRef = await db.collection("cards").add({
    name,
    columnId,
  });

  const doc = await docRef.get();

  const data = doc.data();

  return { ...data, id: doc.id } as ICards;
};

export const deleteCard = async (id: string) => {
  const db = firebase.firestore();

  await db.collection("cards").doc(id).delete();
};
/* Card */
