import React, { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../api/notesApi";
import * as NotesApi from "../api/notesApi";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { InputField } from "./form/InputField";
import styleUtils from "../styles/utils.module.css";
import { ConflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}
export const SignUpModal = ({
  onDismiss,
  onSignUpSuccessful,
}: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  };
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>Sign up</Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
