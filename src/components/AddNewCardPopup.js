import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleCardTitle(evt) {
    setCardTitle(evt.target.value);
  }

  function handleCardLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleAddNewCard({
      title: cardTitle,
      link: cardLink
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="New Place"
      submitButton="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Title" minLength="2" maxLength="30" onChange={handleCardTitle} value={cardTitle} required />
      <span id="card-title-error" className="form__field form__field_error"></span>
      <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="Image link" onChange={handleCardLink} value={cardLink} required />
      <span id="card-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
