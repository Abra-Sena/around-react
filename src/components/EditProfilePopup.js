import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onProfileUpdate({name: name, about: about});
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      submitButton="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Name" minLength="2" maxLength="30" onChange={handleNameChange} value={name} required />
      <span id="card-title-error" className="form__field form__field_error"></span>
      <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="About Me" onChange={handleAboutChange} valuea={about} required />
      <span id="card-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
