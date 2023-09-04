import React, { useState, useEffect } from "react";

import { SignUpModal } from "./components/SignUpModal";
import { LoginModal } from "./components/LoginModal";
import { NavBar } from "./components/NavBar";
import { User } from "./models/user";
import * as NotesApi from "./api/notesApi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NotesPage } from "./pages/NotesPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLogInModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
          onSignUpClicked={() => setShowSignUpModal(true)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
