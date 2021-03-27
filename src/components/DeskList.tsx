import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { CardGrid } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";

interface Desks {
  id: string;
  name: string;
}

const DeskList = () => {
  const [descs, setDescs] = useState<Desks[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("desks")
      .get()
      .then((querySnapshot) => {
        const desks: Desks[] = [];

        querySnapshot.forEach((desk) => {
          desks.push({
            id: desk.id,
            name: desk.data().name,
          });
        });

        setDescs(() => desks);
      });
  }, []);

  if (!descs.length) {
    return null;
  }

  return (
    <CardGrid size="l">
      {descs.map(({ name }, index) => (
        <DeskItem key={index}>{name}</DeskItem>
      ))}
    </CardGrid>
  );
};

export { DeskList };
