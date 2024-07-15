// Loading.js
import React from "react";
import { Spin } from "antd"; // Sử dụng Ant Design Spin

const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loading;