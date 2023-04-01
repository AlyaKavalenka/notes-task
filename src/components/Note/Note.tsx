import { useContext } from 'react';
import Button from '../Button/Button';
import './Note.scss';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { Tag } from '../../types';

export default function Note(props: { text: string }) {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const { text } = props;
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
        />
      </section>
      <article
        className="note__text-wrapper"
        role="presentation"
        onClick={() => setActivePopupNote(true)}
      >
        {text}
      </article>
    </div>
  );
}
