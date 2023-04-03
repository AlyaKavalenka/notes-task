import { INote } from '../types';

export function getParsedNotes(): INote[] {
  const storageNotes = localStorage.getItem('notes');
  let parsedNotes;
  if (storageNotes) parsedNotes = JSON.parse(storageNotes);
  return parsedNotes;
}

export function addNote(
  note: INote,
  viewMode: string,
  noteId: string,
  foundId: number
) {
  if (viewMode === 'create') {
    const addNoteToStorage = [...getParsedNotes(), note];
    localStorage.setItem('notes', JSON.stringify(addNoteToStorage));
  } else if (viewMode === 'edit') {
    const editNoteInStorage = [...getParsedNotes()];
    const editedNote: INote = {
      id: noteId,
      tags: note.tags,
      text: note.text,
    };
    editNoteInStorage.splice(foundId, 1, editedNote);
    localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
  } else {
    localStorage.setItem('notes', JSON.stringify([note]));
  }
}

export function deleteNote(foundId: number) {
  const editNoteInStorage = [...getParsedNotes()];
  editNoteInStorage.splice(foundId, 1);
  localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
}
