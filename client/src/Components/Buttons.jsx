/* eslint-disable react/prop-types */

function PrimaryButton({ text, style }) {
  return (
    <>
      <button className="primary-btn" style={style}>
        {text}
      </button>
    </>
  );
}

function SecondaryButton({ text, style }) {
  return (
    <>
      <button className="secondary-btn" style={style}>
     {text}
      </button>
    </>
  );
}
export { PrimaryButton, SecondaryButton };
