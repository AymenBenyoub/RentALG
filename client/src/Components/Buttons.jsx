/* eslint-disable react/prop-types */
function PrimaryButton({ text }) {
  return (
    <>
      <button className="primary-btn">{text}</button>
    </>
  );
}

function SecondaryButton({ text }) {
  return (
    <>
      <button className="secondary-btn">{text}</button>
    </>
  );
}
export { PrimaryButton, SecondaryButton };
