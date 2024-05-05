/* eslint-disable react/prop-types */
import unknown from "../data/Untitled.png";
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
        src={unknown}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
