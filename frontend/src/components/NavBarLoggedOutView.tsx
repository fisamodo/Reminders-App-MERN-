import React from "react";
import { User } from "../models/user";
import * as NotesApi from "../api/notesApi";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}
export const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign up</Button>
      <Button onClick={onLoginClicked}>Log in</Button>
    </>
  );
};
