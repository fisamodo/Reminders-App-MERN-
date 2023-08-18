import React, { useMemo } from "react";
import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

export const Note = ({
  note,
  onNoteClicked,
  onDeleteNoteClicked,
  className,
}: NoteProps) => {
  const { title, text, from, to, createdAt, updatedAt } = note;

  const createdUpdatedText = useMemo(() => {
    if (updatedAt > createdAt) {
      return "Updated: " + formatDate(updatedAt);
    } else {
      return "Created: " + formatDate(createdAt);
    }
  }, [createdAt, updatedAt]);

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
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
