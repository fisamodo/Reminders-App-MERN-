import React, { useMemo } from "react";
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

export const Note = ({ note, className }: NoteProps) => {
  const { title, text, from, to, createdAt, updatedAt } = note;

  const createdUpdatedText = useMemo(() => {
    if (updatedAt > createdAt) {
      return "Updated: " + formatDate(updatedAt);
    } else {
      return "Created: " + formatDate(createdAt);
    }
  }, [createdAt, updatedAt]);

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.noteText}>{text}</Card.Text>
        {from && (
          <Card.Text className={styles.noteText}>
            From: {formatDate(from)}
          </Card.Text>
        )}
        {to && (
          <Card.Text className={styles.noteText}>
            To: {formatDate(to)}
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text className={styles.noteText}>{createdUpdatedText}</Card.Text>
      </Card.Footer>
    </Card>
  );
};
