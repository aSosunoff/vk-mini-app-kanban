import firebase from "firebase/app";
import { IColumn } from "../features/columns/interfaces/IColumns";

export const getColumns = async (deskId: string) => {
  const db = firebase.firestore();

  const querySnapshot = await db.collection("columns").where("deskId", "==", deskId).get();

  const columns: IColumn[] = [];

  querySnapshot.forEach((doc) => {
    const { deskId, name } = doc.data() as IColumn;

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

  return { ...data, id: doc.id } as IColumn;
};

export const deleteColumn = async (id: string) => {
  const db = firebase.firestore();

  await db.collection("columns").doc(id).delete();
};
