import React, { useEffect, useState } from "react";
import privacyPolicy from "./Privacy_policy.html";

const PrivacyPolicy = () => {
  const [privacyContent, setPrivacyContent] = useState("");

  useEffect(() => {
    fetch(privacyPolicy)
      .then((response) => response.text())
      .then((data) => setPrivacyContent(data))
      .catch((error) => {
        console.error("Error loading privacy policy:", error);
      });
  }, []);

  return (
    <div>
      <h1>Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
    </div>
  );
};

export default PrivacyPolicy;
