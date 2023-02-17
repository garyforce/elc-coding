import React from "react";

const headerText = (amount) => {
  return `${amount} items found`;
};

const ItemsHeader = ({ itemsAmount }) => {
  return (
    <div className="header-result">
      <span>{headerText(itemsAmount)}</span>
    </div>
  );
};

export default ItemsHeader;
