import React from "react";
const ItemRow = ({ item }) => {
  return (
    <div className="card">
      <img src={item.picture} alt={item.name}></img>
      <h3>{item.name}</h3>
      <p className="price">RS. {item.price}</p>
      <p>{item.about}</p>
    </div>
  );
};
export default ItemRow;
