import React, { useEffect, useState } from "react";
import term from "./Terms.html";

const Terms = () => {
  const [termsContent, setTermsContent] = useState("");

  useEffect(() => {
    fetch(term)
      .then((response) => response.text())
      .then((data) => setTermsContent(data))
      .catch((error) => {
        console.error("Error loading terms:", error);
      });
  }, []);

  return (
    <div>
      <h1>Terms and Conditions</h1>
      <div dangerouslySetInnerHTML={{ __html: termsContent }} />
    </div>
  );
};

export default Terms;
