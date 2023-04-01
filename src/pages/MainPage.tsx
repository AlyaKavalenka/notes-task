import './MainPage.scss';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';

export default function MainPage() {
  return (
    <>
      <Header />
      <main>
        <div className="main__wrapper">
          <article className="btns">
            <Button value="Create note" />
            <select name="" id="" value="Filter by tag" className="filter">
              <option value="">Filter by tag</option>
            </select>
          </article>
          <Notes />
        </div>
      </main>
    </>
  );
}
