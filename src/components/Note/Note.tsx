import { useContext } from 'react';
import Button from '../Button/Button';
import './Note.scss';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';

export default function Note() {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const arrTags = [];
  for (let i = 0; i < 9; i += 1) {
    arrTags.push(
      <div className="note__tag" key={i}>
        Tag
      </div>
    );
  }

  function addTags() {
    console.log('click on add tag');
  }

  return (
    <div className="note">
      <section className="note__header">
        {arrTags}
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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
        odio sequi ducimus, temporibus perspiciatis nesciunt accusantium vel
        veniam dolorum dolorem alias. Culpa beatae quos porro in eligendi ex
        maxime deserunt.
      </article>
    </div>
  );
}
