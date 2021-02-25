import React from "react";
import loading from "../../assets/images/loader.svg";

export default function Preloader() {
  return (
    <div>
      <img src={loading} alt="" />
    </div>
  );
}
