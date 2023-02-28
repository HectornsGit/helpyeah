import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink, teal } from "@mui/material/colors";
import { useState } from "react";
import { useTokenContext } from "../../contexts/TokenContext";

export default function Like({
  isLiked,
  likes,
  id,
  entry_id,
  comments,
  setComments,
}) {
  const { REACT_APP_BACKEND_PORT } = process.env;
  const { token } = useTokenContext();
  const [checked, setChecked] = useState(isLiked);

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

    setChecked(!checked);
    setComments(updatedComments);
  };
  return (
    <ul className="ulLike">
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
          checked={checked}
        />
      </li>
      <li>{likes}</li>
    </ul>
  );
}
