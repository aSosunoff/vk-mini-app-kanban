import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import PropsTypes from "prop-types";
import { CardGrid } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";

const DeskList = () => {
  const [desct, setDescs] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("desks")
      .get()
      .then((querySnapshot) => {
        const desks = [];

        querySnapshot.forEach((desk) => {
          desks.push({
            id: desk.id,
            name: desk.data().name,
          });
        });

        setDescs(() => desks);
      });
  }, []);

  if (!desct.length) {
    return null;
  }

  return (
    <CardGrid size="l">
      {desct.map(({ name }, index) => (
        <DeskItem key={index}>{name}</DeskItem>
      ))}
    </CardGrid>
  );
};

DeskList.propTypes = {
  /* list: PropsTypes.arrayOf(
    PropsTypes.shape({
      name: PropsTypes.string,
    })
  ), */
};

export { DeskList };
