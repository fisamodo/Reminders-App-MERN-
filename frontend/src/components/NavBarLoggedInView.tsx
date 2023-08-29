import React from "react";
import { User } from "../models/user";
import * as NotesApi from "../api/notesApi";
import { Button, Navbar } from "react-bootstrap";
interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

export const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  const logout = async () => {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <>
      <Navbar.Text className="me-2">Signed in as : {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};
