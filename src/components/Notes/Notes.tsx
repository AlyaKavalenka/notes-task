import { INote, Tag } from '../../types';
import { getParsedNotes } from '../../utils/storage';
import Note from '../Note/Note';
import './Notes.scss';

export default function Notes(props: { filterTag: Tag }) {
  const { filterTag } = props;

  let notes: JSX.Element[] = [];

  const findTag = getParsedNotes()
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
    setNotes(getParsedNotes());
  } else {
    setNotes(findTag);
  }

  return (
    <div className="notes">
      {getParsedNotes().length ? notes : <h2>Create note...</h2>}
    </div>
  );
}
