import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";

import { SignUpModal } from "./components/SignUpModal";
import { LoginModal } from "./components/LoginModal";
import { NavBar } from "./components/NavBar";
import { User } from "./models/user";
import * as NotesApi from "./api/notesApi";
import { NotesPageLoggedInView } from "./components/NotesPageLoggedInView";
import { NotesPageLoggedOutView } from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);
  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLogInModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLogInModal && (
        <LoginModal
          onDismiss={() => setShowLogInModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
