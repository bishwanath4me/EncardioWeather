import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="highlightBox">
      <div>
        <div style={{ fontSize: "18px" }}>{title}</div>
        <div className="highlightValue">
          <Icon style={{ fontSize: "30px" }} />
          <p style={{ fontSize: "25px" }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox;
