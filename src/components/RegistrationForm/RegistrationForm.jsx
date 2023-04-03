import { Button, Form } from "react-bootstrap";
import RegistrationFormStyled from "./RegistrationForm.styled";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const emailRegExp = /^\S+@\S+\.\S+$/;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState(false);
  const isEmailValid = emailRegExp.test(email) ? true : false;

  const validate = useCallback(() => {
    return username.length && isEmailValid && password.length;
  }, [username.length, isEmailValid, password.length]);

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [validate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (await checkUser(user)) {
      fetch("https://users-api-vxh0.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      navigate("/");
    }
  }

  async function checkUser(user) {
    const users = await axios({
      method: "GET",
      url: "https://users-api-vxh0.onrender.com/users",
    });
    const result = users.data.map((data) => {
      if (data.username === user.username) {
        alert("Username already exist");
        return false;
      }
      if (data.email === user.email) {
        alert("Email already exist");
        return false;
      }
    });
    return !result.includes(false);
  }

  return (
    <RegistrationFormStyled.Container>
      <h2 className="text-center">Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 align-middle" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text>Already have an account?</Form.Text>
          <Link to="/">Log In</Link>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Form>
    </RegistrationFormStyled.Container>
  );
};

export default RegistrationForm;