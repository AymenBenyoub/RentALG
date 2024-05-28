/* eslint-disable react/prop-types */

export default function HouseCard({
  title,
  guests,
  price,
  thumbnail,
  id,
  removeListingFromState,
}) {
  const parsedThumbnail = thumbnail ? JSON.parse(thumbnail)[0] : null;

  const removeListing = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3000/api/accommodations/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {

        throw new Error("ERROR DELETING LISTING:NETWORK ERROR\n ");
      }
      console.log("listing deleted");
      removeListingFromState(id);
    } catch (error) {
      console.error("error deleting listing: " + error);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this listing?")) {
      removeListing(e);
    }
  };
  return (
    <div className="house-card">
      <img
        src={`http://localhost:3000/${parsedThumbnail}`}
        className="house-image"
      />
      <div className="house-details">
        <h2 className="house-title">{title}</h2>
        <p className="house-location">{guests} guests</p>
        <p className="house-price">{price} DA</p>
      </div>
      <button className="remove-listing" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
