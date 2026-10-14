import React from "react";
import styles from "./signup.module.css";
import Card from "../components/Card/Card";
import Form from "../components/Forms/Form";

function Signup() {
  return (
    <div>
      <div
        className={`d-flex justify-content-center container m-4 ${styles.Login}`}
      >
        <Card
          cardTitle={"Sign Up"}
          classNameTitle={`fs-2 mt-3 mb-0 ${styles.CardTitle}`}
          component={
            <Form
              children={
                <>
                  <label
                    htmlFor="exampleInputName"
                    className={`form-label ${styles.labelText}`}
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    className={`form-control mb-3 ${styles.inputField}`}
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                  />
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
                  />
                  <label
                    htmlFor="exampleInputName"
                    className={`form-label ${styles.labelText}`}
                  >
                    Confirm Password
                  </label>

                  <input
                    type="text"
                    className={`form-control mb-3 ${styles.inputField}`}
                    id="exampleInputName"
                    aria-describedby="nameHelp"
                  />
                </>
              }
              classNameForm={`mt-2 text-start ${styles.LoginForm}`}
              inputField={`${styles.inputField}`}
              onSubmit={() => console.log("data is coming from signup")}
            />
          }
          classNameBodyBtn={"d-none"}
          classNameCard={`${styles.LoginCard} d-flex ps-5 pe-5 text-center`}
        />
      </div>
    </div>
  );
}

export default Signup;
