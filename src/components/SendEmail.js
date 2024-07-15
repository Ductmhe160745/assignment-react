import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function SendEmail() {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceId = "service_3z00zal";
    const templateId = "template_hgdxuec";
    const publicKey = "k85o5juTw71kiQ3n_";

    const templateParams = {
      from_name: name,
      form_email: email,
      to_name: "F-care",
      message: mess,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("email send success", response);
        setName("");
        setEmail("");
        setMess("");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input
        type="text"
        name="user_name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Message</label>
      <textarea
        name="message"
        value={mess}
        onChange={(e) => {
          setMess(e.target.value);
        }}
      />
      <input type="submit" value="Send" />
    </form>
  );
}

export default SendEmail;
