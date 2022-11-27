import React from "react";

import EMPTY from "assets/empty.png";

const Empty: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 50,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={EMPTY} style={{ width: "fit-content", marginBottom: 48 }} />
      <h4>{text}</h4>
    </div>
  );
};

export default Empty;
