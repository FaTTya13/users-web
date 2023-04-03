import { Button, Form } from "react-bootstrap";
import LoginFormStyled from "./LoginForm.styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios({
      method: "POST",
      url: "https://users-api-vxh0.onrender.com/auth/signin",
      data: user,
    })
      .then((response) => {
        if (response.data) {
          props.onSuccess(response.data);
          navigate("/users");
        } else {
          props.onFail();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <LoginFormStyled.Container>
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleClick}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            name="email"
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
          <Form.Text>Don’t have an account?</Form.Text>
          <Link to="/signup">Sign up</Link>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </LoginFormStyled.Container>
  );
};

export default LoginForm;