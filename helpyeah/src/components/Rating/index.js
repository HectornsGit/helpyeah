import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

//esta funcion tiene que recibir un setComments o algo así y actualizarlo manualmente cuando recibamos el nuevo rating despues de votar
export default function HalfRating({
  entry_id,
  comment_id,
  setComments,
  comments,
  averageRating,
}) {
  const { token } = useTokenContext();
  const { REACT_APP_BACKEND_PORT } = process.env;

  //Funcion para pasarsela al onChange y hacer la fetch.
  const ratingFunction = async (e, newValue) => {
    const res = await fetch(
      `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${entry_id}/${comment_id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: newValue }),
      }
    );

    const body = await res.json();
    //devolver el nuevo rating calculado después del voto

    if (!res.ok) {
      throw new Error(body.message);
    }
  };

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={Math.round(averageRating)} //esto es lo que viene del backend inicialmente y despues del estado que guarda los comentarios
        precision={1}
        onChange={(e, newValue) => {
          ratingFunction(e, newValue);
        }}
      />
    </Stack>
  );
}

//PREGUNTAR A BERTO COMO PODRIAMOS HACER LA FETCH PARA QUE LUEGO DE VOTAR APAREZCA REFLEJADO EL AVERAGE RATING.
//PREGUNTAR LO DEL NAVLIST DE MUI.
