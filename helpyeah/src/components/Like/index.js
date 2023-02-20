import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink, teal } from "@mui/material/colors";

import { useTokenContext } from "../../contexts/TokenContext";

export default function Like({ likes, id, entry_id, comments, setComments }) {
  const { REACT_APP_BACKEND_PORT } = process.env;
  const { token } = useTokenContext();

  const toggleLike = async () => {
    const res = await fetch(
      `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${entry_id}/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      }
    );

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message);
    }
    const updatedComment = await body.data;

    const updatedComments = comments.map((comment) => {
      return comment.id === id ? updatedComment : comment;
    });

    setComments(updatedComments);
  };
  return (
    <ul>
      <li>
        <Checkbox
          onClick={(event) => {
            toggleLike();
          }}
          sx={{
            color: teal,
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </li>
      <li>{likes}</li>
    </ul>
  );
}
