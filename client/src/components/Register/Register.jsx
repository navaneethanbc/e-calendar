import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import InputField from "./InputField";
import RegText from "./RegText";
import "../.././index.css";
import image from "../../assets/background.jpg";

const USER_REG = /^[A-z]{3,20}$/;
const PWD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ACC_REG = /^[0-9]{10,15}$/;
const EMP_ID = /^(?:\d{8,12}|[A-Za-z0-9]{7}[A-Za-z])$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [accNumber, setAccNumber] = useState("");
  const [validAccNumber, setValidAccNumber] = useState(false);
  const [accNumberFocus, setAccNumberFocus] = useState(false);

  const [employeeID, setEmployeeID] = useState("");
  const [validEmployeeID, setValidEmployeeID] = useState(false);
  const [employeeIDFocus, setEmployeeIDFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirm, setValidConfirm] = useState(false);
  const [confirmFocus, setConfirmFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidFirstName(USER_REG.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(USER_REG.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidEmail(EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setValidAccNumber(ACC_REG.test(accNumber));
  }, [accNumber]);

  useEffect(() => {
    setValidEmployeeID(EMP_ID.test(employeeID));
  }, [employeeID]);

  useEffect(() => {
    setValidPwd(PWD_REG.test(pwd));
    setValidConfirm(pwd === confirmPwd);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, accNumber, employeeID, pwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REG.test(firstName);
    const v2 = USER_REG.test(lastName);
    const v3 = EMAIL.test(email);
    const v4 = ACC_REG.test(accNumber);
    const v5 = EMP_ID.test(employeeID);
    const v6 = PWD_REG.test(pwd);
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      setErrMsg("Invalid Entry");
      errRef.current.focus();
      return;
    }
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          firstName,
          lastName,
          email,
          accNumber,
          employeeID,
          pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setAccNumber("");
      setEmployeeID("");
      setPwd("");
      setConfirmPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div>
        <img src={image} alt="Background" />
      </div>
      <div>
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a href="/sign-in">Sign In</a>
            </p>
          </section>
        ) : (
          <section className="box-border border-none">
            <h1 className="text-5xl font-bold ">Register</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
            </p>
            <br />

            <form
              onSubmit={handleSubmit}
              className="box-content px-3 border-2 shadow-sm py-7 shadow-black "
            >
              <InputField
                userID="firstName"
                validID={validFirstName}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                text={"3 to 20 characters. Must allow letters."}
                focus={firstNameFocus}
                focusT={() => setFirstNameFocus(true)}
                focusF={() => setFirstNameFocus(false)}
              />

              <InputField
                userID="lastName"
                validID={validLastName}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                text={"3 to 20 characters. Must allow letters."}
                focus={lastNameFocus}
                focusT={() => setLastNameFocus(true)}
                focusF={() => setLastNameFocus(false)}
              />

              <InputField
                userID="email"
                validID={validEmail}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                text={"Invalid email format."}
                focus={emailFocus}
                focusT={() => setEmailFocus(true)}
                focusF={() => setEmailFocus(false)}
              />

              <InputField
                userID="accNumber"
                validID={validAccNumber}
                type="text"
                placeholder="Account Number  (Customers only)"
                value={accNumber}
                onChange={(e) => setAccNumber(e.target.value)}
                text={"Invalid account."}
                focus={accNumberFocus}
                focusT={() => setAccNumberFocus(true)}
                focusF={() => setAccNumberFocus(false)}
              />

              <InputField
                userID="employeeID"
                validID={validEmployeeID}
                type="text"
                placeholder="Employee ID  (Employees only)"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                text={"Invalid ID."}
                focus={employeeIDFocus}
                focusT={() => setEmployeeIDFocus(true)}
                focusF={() => setEmployeeIDFocus(false)}
              />

              <InputField
                userID="password"
                validID={validPwd}
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                text={
                  "8 to 24 characters. Must include uppercase, lowercase, number, and special character."
                }
                focus={pwdFocus}
                focusT={() => setPwdFocus(true)}
                focusF={() => setPwdFocus(false)}
              />

              <InputField
                userID="confirm_pwd"
                validID={validConfirm}
                type="password"
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                text={"Must match the password."}
                focus={confirmFocus}
                focusT={() => setConfirmFocus(true)}
                focusF={() => setConfirmFocus(false)}
              />

              <RegText />

              <button
                className="bg-black text-white rounded-lg px-4 py-1.5 border-none mt-3"
                disabled={
                  !validFirstName ||
                  !validLastName ||
                  !validEmail ||
                  !(validAccNumber || validEmployeeID) ||
                  !validPwd ||
                  !validConfirm
                }
                onClick={() => {
                  if (
                    validFirstName &&
                    validLastName &&
                    validEmail &&
                    (validAccNumber || validEmployeeID) &&
                    validPwd &&
                    validConfirm
                  ) {
                    window.location.href = "/sign-in";
                  } else {
                    setErrMsg("Invalid Entry");
                  }
                }}
              >
                Get Started
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default Register;
