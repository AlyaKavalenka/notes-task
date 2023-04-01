import Note from '../Note/Note';

export default function Notes() {
  const notes = [];
  for (let i = 0; i < 20; i += 1) {
    notes.push(<Note />);
  }
  return <div>{notes}</div>;
}
