import React, { useState } from "react";
import Card from "../components/Card/Card";
import Form from "../components/Forms/Form";
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log(email, password);
  };
  return (
    <div>
      <div
        className={`d-flex justify-content-center container m-4 ${styles.Login}`}
      >
        <Card
          cardTitle={"Login"}
          classNameTitle={`fs-2 mt-3 mb-0 ${styles.CardTitle}`}
          component={
            <Form
              children={
                <>
                  <label
                    htmlFor="exampleInputName"
                    className={`form-label ${styles.labelText}`}
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    className={`form-control mb-3 ${styles.inputField}`}
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="exampleInputName"
                    className={`form-label ${styles.labelText}`}
                  >
                    Password
                  </label>

                  <input
                    type="text"
                    className={`form-control mb-3 ${styles.inputField}`}
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              }
              classNameForm={`mt-2 text-start ${styles.LoginForm}`}
              inputField={`${styles.inputField}`}
              onSubmit={handleSubmit}
            />
          }
          classNameBodyBtn={"d-none"}
          classNameCard={`${styles.LoginCard} d-flex ps-5 pe-5 text-center`}
        />
      </div>
    </div>
  );
}

export default Login;
