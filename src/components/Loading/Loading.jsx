import React from "react";
import { ThreeDots } from "react-loader-spinner";
const Loading = ({
  size = 80,
  color = "#4fa94d",
  text = "Loading",
  showdots = true,
  dotSize = 50,
  dotColor = "#4fa94d",
  textColor = "green",
  textStyle = {},
}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {showdots && (
        <ThreeDots
          height={dotSize}
          width={dotSize}
          color={dotColor}
          visible={true}
          ariaLabel="three-dots-rotating"
        />
      )}
      <span
        style={{
          fontSize: "20px",
          color: textColor,
          letterSpacing: "3px",
          ...textStyle,
        }}
      >
        {text}
      </span>
    </div>
  );
};
export default Loading;
