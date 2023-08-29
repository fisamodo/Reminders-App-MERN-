import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../api/notesApi";
import * as NotesApi from "../api/notesApi";
import { InputField } from "./form/InputField";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

export const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title,
      text: noteToEdit?.text,
      from: noteToEdit?.from
        ? new Date(noteToEdit?.from).toISOString().substring(0, 10)
        : "",
      to: noteToEdit?.to
        ? new Date(noteToEdit?.to).toISOString().substring(0, 10)
        : "",
    },
  });
  console.log(noteToEdit?.from);
  console.log(new Date(noteToEdit?.from!));

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? " Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <InputField
            name="text"
            label="Text"
            as="textarea"
            rows={4}
            placeholder="Text"
            register={register}
            error={errors.title}
          />

          <InputField
            name="from"
            label="From"
            type="date"
            register={register}
            error={errors.title}
          />
          <InputField
            name="to"
            label="To"
            type="date"
            register={register}
            error={errors.title}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
