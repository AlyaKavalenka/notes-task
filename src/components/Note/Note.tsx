import { useContext } from 'react';
import './Note.scss';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { Tag } from '../../types';
import { EditNoteContext } from '../../context/EditNoteContext';
import Tags from '../Tags/Tags';

export default function Note(props: {
  text: string;
  id: string;
  arrTags: Tag[];
}) {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const { setNoteId } = useContext(EditNoteContext);
  const { text, id, arrTags } = props;

  return (
    <div className="note">
      <Tags noteTags={arrTags} setNoteTags={() => {}} />
      <article
        className="note__text-wrapper"
        role="presentation"
        id={id}
        onClick={(e) => {
          setNoteId(e.currentTarget.id);
          setActivePopupNote('edit');
        }}
      >
        {text}
      </article>
    </div>
  );
}
