import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';

export default function MainPage() {
  return (
    <>
      <Header />
      <main>
        <div className="main__wrapper">
          <Button value="Create note" />
          <Notes />
        </div>
      </main>
    </>
  );
}
