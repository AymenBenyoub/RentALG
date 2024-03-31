/* eslint-disable react/prop-types */
import mus from "./pics/mus.jpg";
const Avatar = ({ size }) => {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src={mus}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
