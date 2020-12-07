import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


function App() {
  //popupus
  const [isAddNewCard, setAddNewCardPopup] = React.useState(false);
  const [isEditAvatar, setEditAvatarPopup] = React.useState(false);
  const [isEditProfile, setEditProfilePopup] = React.useState(false);
  const [isDeleteCard, setDeleteCardPopup] = React.useState(false);
  const [isImageExpand, setImageExpand] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');


  //handle click on buttons
  function handleEditAvatarBtn() {
    setEditAvatarPopup(true);
  }
  function handleEditProfileBtn() {
    setEditProfilePopup(true);
  }
  function handleEditAddCardBtn() {
    setAddNewCardPopup(true);
  }
  // function handleEscClose(evt) {
  //   if(evt.which === 27) {
  //     this.close();
  //   }
  // }
  function handlePopupClose(evt) {
    if(evt.target !== evt.currentTarget) return;

    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddNewCardPopup(false);
    setDeleteCardPopup(false);
    setSelectedCard(false);
    // setImageExpand(false);
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
        handleEditAddCardBtn={handleEditAddCardBtn}
        handleDeleteCardBtn={handleDeleteCardBtn}
        handleCardClick={(card) => handleCardClick(card)}
        onClose={handlePopupClose}
      />
      <Footer />
    </>
  );
}

export default App;
