import Button from '../Button/Button';
import './Note.scss';

export default function Note() {
  const arrTags = [];
  for (let i = 0; i < 9; i += 1) {
    arrTags.push(<div className="note__tag">Tag</div>);
  }
  return (
    <div className="note">
      <section className="note__header">
        {arrTags}
        <Button value="+" />
      </section>
      <article className="note__text-wrapper">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
        odio sequi ducimus, temporibus perspiciatis nesciunt accusantium vel
        veniam dolorum dolorem alias. Culpa beatae quos porro in eligendi ex
        maxime deserunt.
      </article>
    </div>
  );
}
