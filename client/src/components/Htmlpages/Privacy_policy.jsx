import React from "react";

const PrivacyPolicy = () => {
  const privacyContent = `
    <h2>Privacy Policy</h2>
    <p>We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.</p>
    
    <h3>Information We Collect</h3>
    <p>We may collect the following types of personal information when you use our website:</p>
    <ul>
      <li>Contact details such as name, email address, and phone number.</li>
      <li>Usage data such as browsing behavior and interactions with our website.</li>
    </ul>

    <h3>How We Use Your Information</h3>
    <p>Your information may be used for the following purposes:</p>
    <ul>
      <li>To provide and improve our services.</li>
      <li>To communicate with you, respond to your inquiries, and provide support.</li>
      <li>To comply with legal obligations or enforce our terms and policies.</li>
    </ul>

    <h3>Data Security</h3>
    <p>We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or destruction.</p>

    <h3>Your Rights</h3>
    <p>You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us using the information provided on our website.</p>

    <h3>Changes to This Privacy Policy</h3>
    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, so please review it regularly.</p>
  `;

  return (
    <div>
      <h1>Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
    </div>
  );
};

export default PrivacyPolicy;
