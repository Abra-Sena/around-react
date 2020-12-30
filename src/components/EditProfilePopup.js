import React from 'react';
import PopupWithForm from './PopupWithForm';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  // const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onProfileUpdate({name, about});
  }

  // copy user data into popup form on open
  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser]);


  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      submitButton="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Name" minLength="2" maxLength="30" value={name} onChange={handleNameChange} required />
      <span id="card-title-error" className="form__field form__field_error"></span>
      <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="About Me" value={about} onChange={handleAboutChange} required />
      <span id="card-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
