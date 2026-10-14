import React from "react";
import Button from "../Button/Button";

import styles from "./form.module.css";

function Form({ className, classNameForm, inputField, children,onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };
  return (
    <>
      <form
        className={`${styles.Form} ${classNameForm}`}
        onSubmit={handleSubmit}
      >
        <div className={`mb-3 ${className}`}>
          {children == null ? (
            <>
              <label
                htmlFor="exampleInputName"
                className={`form-label ${styles.labelText}`}
              >
                Name
              </label>

              <input
                type="text"
                className={`form-control mb-3 ${styles.inputField} ${inputField}`}
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label ${styles.labelText}`}
              >
                Email address
              </label>
              <input
                type="email"
                className={`form-control mb-3 ${styles.inputField}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className={`form-label ${styles.labelText}`}
                >
                  Message
                </label>
                <textarea
                  className={`form-control mb-3 ${styles.inputField}`}
                  id="exampleFormControlTextarea1"
                  rows={3}
                  defaultValue={""}
                />
              </div>
            </>
          ) : (
            children
          )}
        </div>
        <div className="d-flex justify-content-center">
          <Button children={"Submit"} type="submit" />
        </div>
      </form>
    </>
  );
}

export default Form;
