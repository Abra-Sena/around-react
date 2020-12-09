import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function App() {
  //popupus
  const [isAddNewCard, setAddNewCardPopup] = React.useState(false);
  const [isEditAvatar, setEditAvatarPopup] = React.useState(false);
  const [isEditProfile, setEditProfilePopup] = React.useState(false);
  const [isDeleteCard, setDeleteCardPopup] = React.useState(false);
  const [isImageExpand, setImageExpand] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: "Yosemite", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"});


  //handle click on buttons
  function handleEditAvatarBtn() {
    setEditAvatarPopup(true);
  }
  function handleEditProfileBtn() {
    setEditProfilePopup(true);
  }
  function handleAddCardBtn() {
    setAddNewCardPopup(true);
  }
  function handleEscClose(evt) {
    if(evt.which === 27) {
      this.close();
    }
  }
  function handlePopupClose(evt) {
    if(evt.target !== evt.currentTarget) return;

    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddNewCardPopup(false);
    setDeleteCardPopup(false);
    setSelectedCard(selectedCard);
    setImageExpand(false);
  }
  function handleDeleteCardBtn() {
    setDeleteCardPopup(true)
  }
  // function handleLikeClick(card) {

  // }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImageExpand(true);
  }


  return (
    <>
      <Header />
      <Main
        // send these state variables and their associated functions to main
        isEditAvatar={isEditAvatar}
        isEditProfile={isEditProfile}
        isAddNewCard={isAddNewCard}
        isDeleteCard={isDeleteCard}
        isImageExpand={isImageExpand}
        selectedCard={selectedCard}
        handleEditAvatarBtn={handleEditAvatarBtn}
        handleEditProfileBtn={handleEditProfileBtn}
        handleAddCardBtn={handleAddCardBtn}
        handleDeleteCardBtn={() => handleDeleteCardBtn()}
        handleCardClick={(card) => handleCardClick(card)}
        handleEscClose={handleEscClose}
        onClose={handlePopupClose}
      />
      <Footer />

      {/* Edit avatar popup */}
      <PopupWithForm name="edit-avatar" title="Change Profile Picture" submitButton="Save" isOpen={isEditAvatar} onClose={handlePopupClose} >
        <input id="avatar-url" type="url" name="link" className="form__input form__input_type_avatar-url" placeholder="Avatar link" required />
        <span id="avatar-url-error" className="form__field form__field_error"></span>
      </PopupWithForm>

      {/* Edit Profile popup */}
      <PopupWithForm name="edit-profile" title="Edit Profile" submitButton="Save" isOpen={isEditProfile} onClose={handlePopupClose} >
        <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Name" minLength="2" maxLength="30" required />
        <span id="card-title-error" className="form__field form__field_error"></span>
        <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="About Me" required />
        <span id="card-url-error" className="form__field form__field_error"></span>
      </PopupWithForm>

      {/* Add New Card Popup */}
      <PopupWithForm name="add-card" title="New Place" submitButton="Save" isOpen={isAddNewCard} onClose={handlePopupClose}>
        <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Title" minLength="2" maxLength="30" required />
        <span id="card-title-error" className="form__field form__field_error"></span>
        <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="Image link" required />
        <span id="card-url-error" className="form__field form__field_error"></span>
      </PopupWithForm>

      {/* Delete card confirmation */}
      <PopupWithForm name="delete" title="Are You Sure?" submitButton="Yes" isOpen={isDeleteCard} onClose={handlePopupClose} />

      {/* Expand card on full-screen */}
      <PopupWithImage src={selectedCard.src} title={selectedCard.title} isOpen={isImageExpand} onClose={handlePopupClose} />

    </>
  );
}

export default App;
