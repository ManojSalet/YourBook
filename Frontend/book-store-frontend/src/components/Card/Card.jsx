import React from "react";
import style from "./card.module.css";
import Button from "../Button/Button";

function Card({ imgsrc, alt, cardTitle, cardText, btnText, classNameCard,classNameBody, classNameBodyBtn,classNameTitle ,Style, component}) {

  return (
    <div className={`card d-flex justify-content-between ${classNameCard} ${style.Card}`} style={Style}>
      <img src={imgsrc} className="card-img-top " alt={alt} />
      <div className={`card-body d-flex flex-column justify-content-between ${classNameBody}`}> 
        <h5 className={`card-title ${classNameTitle}`}>{cardTitle}</h5>
        <p className="card-text">{cardText}</p>
        {component}
        <Button className={`${classNameBodyBtn}`}>{btnText}</Button> 
      </div>
    </div>
  );
}

export default Card;
