import React from "react";

const RegText = () => {
  return (
    <>
      <p>
        By clicking "Get Started", you agree to Our
        <a href="/terms" style={{ textDecoration: "underline" }}>
          Terms
        </a>
        ,{" "}
        <a href="/privacy" style={{ textDecoration: "underline" }}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/cookies" style={{ textDecoration: "underline" }}>
          Cookies Policy
        </a>
        .
      </p>
    </>
  );
};

export default RegText;
