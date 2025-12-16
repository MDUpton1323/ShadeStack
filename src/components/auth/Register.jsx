import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import "./Login.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((existingUsers) => {
      if (existingUsers.length > 0) {
        window.alert("Account with that email already exists");
      } else {
        const newUser = {
          email: email,
        };

        createUser(newUser).then((createdUser) => {
          localStorage.setItem(
            "shade_user",
            JSON.stringify({
              id: createdUser.id,
              email: createdUser.email,
            })
          );
          navigate("/collection");
        });
      }
    });
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleRegister}>
          <h1>ShadeStack</h1>
          <h2>Create an account</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="button-primary" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="link-container">
        <Link to="/login">Already have an account</Link>
      </section>
    </main>
  );
};
