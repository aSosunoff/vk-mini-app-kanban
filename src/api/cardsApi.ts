import firebase from "firebase/app";
import { ICard } from "../features/cards/interfaces/ICard";

export const getCards = async (columnId: string) => {
  const db = firebase.firestore();

  const querySnapshot = await db.collection("cards").where("columnId", "==", columnId).get();

  const cards: ICard[] = [];

  querySnapshot.forEach((doc) => {
    const { columnId, name } = doc.data() as ICard;

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

  return { ...data, id: doc.id } as ICard;
};

export const deleteCard = async (id: string) => {
  const db = firebase.firestore();

  await db.collection("cards").doc(id).delete();
};
