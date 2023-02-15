import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

//esta funcion tiene que recibir un setComments o algo así y actualizarlo manualmente cuando recibamos el nuevo rating despues de votar
export default function HalfRating({ entry_id, comment_id }) {
  const { token } = useTokenContext();
  const { REACT_APP_BACKEND_PORT } = process.env;

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={3} //esto es lo que viene del backend inicialmente y despues del estado que guarda los comentarios
        precision={1}
        onChange={async (e, newValue) => {
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
        }}
      />
    </Stack>
  );
}
