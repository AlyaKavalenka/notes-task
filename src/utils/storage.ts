import { INote } from '../types';

export default function getParsedNotes(): INote[] {
  const storageNotes = localStorage.getItem('notes');
  let parsedNotes;
  if (storageNotes) parsedNotes = JSON.parse(storageNotes);
  return parsedNotes;
}
