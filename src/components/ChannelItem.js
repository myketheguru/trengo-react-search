import React from "react";

const ChannelItem = ({ item, removeItem }) => {
  return (
    <div className="item">
      <div className="item-info">
        <div className="handle">
          <i className="fas fa-grip-vertical"></i>
        </div>
        <div className="icon">
          <i
            className={"fa" + item.iconType.slice(0, 1) + " fa-" + item.icon}
          ></i>
        </div>
        <p>{item.name}</p>
      </div>
      <div className="item-action" onClick={(evt) => removeItem(item.id)}>
        <span>Remove</span>
      </div>
    </div>
  );
};

export default ChannelItem;
