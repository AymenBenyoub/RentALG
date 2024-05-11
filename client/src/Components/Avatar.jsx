/* eslint-disable react/prop-types */

const Avatar = ({ size, image }) => {
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
        src={`http://localhost:3000/${image}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Avatar;
