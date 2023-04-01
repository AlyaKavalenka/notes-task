import { useContext } from 'react';
import Button from '../Button/Button';
import './Note.scss';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { Tag } from '../../types';
import { EditNoteContext } from '../../context/EditNoteContext';

export default function Note(props: { text: string; id: string }) {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const { setNoteId } = useContext(EditNoteContext);
  const { text, id } = props;
  const arrTags: Tag[] = [];

  const tags = arrTags.map((item) => (
    <div className="note__tag" key={`${item}`}>
      {item}
    </div>
  ));

  function addTags() {
    console.log('click on add tag');
  }

  return (
    <div className="note">
      <section className="note__header">
        {tags}
        <Button
          value="+"
          handleClick={() => {
            addTags();
          }}
          disable={false}
        />
      </section>
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
