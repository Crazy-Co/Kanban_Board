import React from "react";
import { Grid } from "react-loader-spinner";
const Loading = ({
  text = "Loading",
  show = true,
  Size = 25,
  Color = "#1db3c8",
  textColor = "#1db3c8",
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
      {show && (
        <Grid
          height={Size}
          width={Size}
          color={Color}
          visible={true}
          ariaLabel="grid"
        />
      )}
      <span
        style={{
          fontSize: "15px",
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
