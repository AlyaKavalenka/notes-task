import './Button.scss';

export default function Button(props: {
  value: string;
  handleClick: () => void;
  disable: boolean;
}) {
  const { value, handleClick, disable } = props;
  return (
    <button
      type="button"
      className="btn"
      onClick={handleClick}
      disabled={disable}
    >
      {value}
    </button>
  );
}
