import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRefs = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRefs.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change Profile Picture"
      submitButton="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarRefs} id="avatar-url" type="url" name="link" className="form__input form__input_type_avatar-url" placeholder="Avatar link" required />
      <span id="avatar-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
