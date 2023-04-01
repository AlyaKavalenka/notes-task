import { INote } from '../../types';
import Note from '../Note/Note';
import './Notes.scss';

export default function Notes() {
  const storageNotes = localStorage.getItem('notes');
  let parsedNotes = [];
  let notes = [];
  if (storageNotes) parsedNotes = JSON.parse(storageNotes);
  notes = parsedNotes.map((item: INote) => (
    <Note text={item.text} key={item.id} />
  ));

  return (
    <div className="notes">
      {parsedNotes.length ? notes : <h2>Create note...</h2>}
    </div>
  );
}
