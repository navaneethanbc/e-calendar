import React, { useEffect, useState } from "react";
import cookie from "./Cookies_policy.html";

const Cookies = () => {
  const [CookieContent, setCookieContent] = useState("");

  useEffect(() => {
    fetch(cookie)
      .then((response) => response.text())
      .then((data) => setCookieContent(data))
      .catch((error) => {
        console.error("Error loading terms:", error);
      });
  }, []);

  return (
    <div>
      <h1>Cookies Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: CookieContent }} />
    </div>
  );
};

export default Cookies;
