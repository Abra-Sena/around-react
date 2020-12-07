import React from 'react';


function Card(props) {
  return (
    <li className="element__item">
      <button type="button" aria-label="delete-card" className="element__delete" onClick={props.handleDeleteCardBtn}></button>
      <img className="element__photo" src={props.src} alt={props.alt} onClick={props.handleCardClick} />
      <div className="element__details">
        <h2 className="element__name">{props.title}</h2>
        <div className="element__likes">
          <button type="button" aria-label="like-card" className="element__like" onClick={props.handleLikeBtnClick}></button>
          <p className="element__like_count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
