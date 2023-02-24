import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { green, lightGreen } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { useTokenContext } from "../../contexts/TokenContext";
import { useParams } from "react-router-dom";

const StyleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[400],
    "&:hover": {
      backgroundColor: alpha(green[400], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[400],
  },
  "& .MuiSwitch-switchBase.Mui-disabled": { color: lightGreen[400] },
  "& .MuiSwitch-switchBase.Mui-checked.Mui-disabled": {
    color: lightGreen[400],
  },
}));

export default function SolvedSwitch({ setChecked, checked, user_id }) {
  const { id } = useParams();
  const { REACT_APP_BACKEND_PORT } = process.env;
  const { token, loggedUser } = useTokenContext();

  const toggleSolved = async () => {
    console.log(checked);
    const res = await fetch(
      `http://localhost:${REACT_APP_BACKEND_PORT}/entries/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
      }
    );

    const body = await res.json();
    console.log(body);
    if (!res.ok) {
      throw new Error(body.message);
    }
    setChecked(body.data.solved);
  };

  return (
    <>
      {loggedUser.id === user_id ? (
        <StyleSwitch
          checked={checked}
          onChange={(event) => {
            toggleSolved();
          }}
        />
      ) : (
        <StyleSwitch
          checked={checked}
          onChange={(event) => {
            toggleSolved();
          }}
          disabled
        />
      )}
    </>
  );
}
