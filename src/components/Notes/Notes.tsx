import { INote, Tag } from '../../types';
import Note from '../Note/Note';
import './Notes.scss';

export default function Notes(props: { filterTag: Tag }) {
  const { filterTag } = props;
  const storageNotes = localStorage.getItem('notes');
  let parsedNotes = [];
  let notes: JSX.Element[] = [];
  if (storageNotes) parsedNotes = JSON.parse(storageNotes);
  const findTag = parsedNotes
    .map((item: INote) => {
      const tempArr = [];
      if (item.tags.find((el) => el === filterTag)) {
        tempArr.push(item);
      }
      return tempArr;
    })
    .flat();

  function setNotes(notesArr: INote[]) {
    notes = notesArr.map((item: INote) => (
      <Note text={item.text} arrTags={item.tags} key={item.id} id={item.id} />
    ));
  }
  if (filterTag === 'none') {
    setNotes(parsedNotes);
  } else {
    setNotes(findTag);
  }

  return (
    <div className="notes">
      {parsedNotes.length ? notes : <h2>Create note...</h2>}
    </div>
  );
}
