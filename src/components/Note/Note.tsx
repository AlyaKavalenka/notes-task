import { useContext } from 'react';
import './Note.scss';
import { ViewModeContext } from '../../context/ViewModeContext';
import { Tag } from '../../types';
import { EditNoteContext } from '../../context/EditNoteContext';
import Tags from '../Tags/Tags';

export default function Note(props: {
  text: string;
  id: string;
  arrTags: Tag[];
}) {
  const { setViewMode } = useContext(ViewModeContext);
  const { setNoteId } = useContext(EditNoteContext);
  const { text, id, arrTags } = props;

  return (
    <div className="note">
      <Tags noteTags={arrTags} setNoteTags={() => {}} />
      <article className="note__text-wrapper">
        <button
          className="note__text-button"
          type="button"
          id={id}
          onClick={(e) => {
            setNoteId(e.currentTarget.id);
            setViewMode('edit');
          }}
        >
          {text}
        </button>
      </article>
    </div>
  );
}
