import { useContext } from 'react';
import './Note.scss';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { Tag } from '../../types';
import { EditNoteContext } from '../../context/EditNoteContext';

export default function Note(props: {
  text: string;
  id: string;
  arrTags: Tag[];
}) {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const { setNoteId } = useContext(EditNoteContext);
  const { text, id, arrTags } = props;

  const tags = arrTags.map((item) => (
    <div className="note__tag" key={`${item}`}>
      {item}
    </div>
  ));

  return (
    <div className="note">
      <section className="note__header">{tags}</section>
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
