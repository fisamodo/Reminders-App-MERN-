import React from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteModel;
}

export const Note = ({ note }: NoteProps) => {
  const { title, text, from, to, createdAt, updatedAt } = note;
  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text className={styles.noteText}>{note.text}</Card.Text>
        <Card.Text className={styles.noteText}>{note.from}</Card.Text>
        <Card.Text className={styles.noteText}>{note.to}</Card.Text>
      </Card.Body>
    </Card>
  );
};
