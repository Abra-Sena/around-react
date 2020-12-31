import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddNewCardPopup';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithImage from './PopupWithImage';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // current user context
  const [currentUser, setCurrentUser] = React.useState({});
  //popupus
  const [isAddNewCard, setAddNewCardPopup] = React.useState(false);
  const [isEditAvatar, setEditAvatarPopup] = React.useState(false);
  const [isEditProfile, setEditProfilePopup] = React.useState(false);
  const [isDeleteCard, setDeleteCardPopup] = React.useState(false);
  const [isImageExpand, setImageExpand] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: "Yosemite", link: "https://code.s3.yandex.net/web-code/yosemite.jpg"});
  const [cards, setCards] = React.useState([]);


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
  // function handleDeleteBtn(card) { // not needed yet
  //   setDeleteCardPopup(true);
  // }
  function handleCardClick(card) {
    setSelectedCard(card);
    setImageExpand(true);
  }
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    let res = isLiked ? api.removeCardLike(card.id) : api.addCardLike(card.id);

    res.then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c.id === card.id ? newCard : c);
      // Update the state
      setCards(newCards);
    }).catch(err => console.log(err));
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
  function handleCardDelete(card) {
    api.removeCard(card.id)
      .then(() => {
        const cardsCopy = cards.filter((item) => item.id !== card.id);
        setCards(cardsCopy);
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatar(avatar) {
    api.setUserAvatar({avatar})
      .then((res) => { setCurrentUser(res) })
      .then(() =>  setEditAvatarPopup(false))
      .catch(err => console.log(err));
  }

  function handleEditProfile({name, about}) {
    api.setUserInfos({name, about})
      .then((user) => { setCurrentUser(user); })
      .then(() =>  setEditProfilePopup(false))
      .catch(err => console.log(err));
  }

  function transformCard(cardItem) {
    return {
      alt: cardItem.name,
      title: cardItem.name,
      src: cardItem.link,
      id: cardItem._id,
      owner: cardItem.owner,
      likes: cardItem.likes
    }
  }

  function handleAddNewCard({name, link}) {
    api.addCard({name, link})
      .then((newCard) => setCards([transformCard(newCard), ...cards]) )
      .then(() => setAddNewCardPopup(false))
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));

    api.getInitialCards()
    .then((initialCards) => {
      setCards(
        initialCards.map(transformCard)
      )
    })
    .catch(err => console.log(err));
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        // send these state variables and their associated functions to main
        cards={cards}
        // popups button click
        handleEditAvatarBtn={handleEditAvatarBtn}
        handleEditProfileBtn={handleEditProfileBtn}
        handleAddCardBtn={handleAddCardBtn}
        // other buttons
        handleCardLike={(card) => handleCardLike(card)}
        handleCardDelete={(card) => handleCardDelete(card)}
        // functionnalities
        handleCardClick={(card) => handleCardClick(card)}
        handleEscClose={handleEscClose}
        onCardClick={(card) => handleCardClick(card)}
        onDeleteClick={(card) => handleCardDelete(card)}
        onLickeClick={(card) => handleCardLike(card)}
      />
      <Footer />

      {/* Edit avatar popup */}
      <EditAvatarPopup isOpen={isEditAvatar} onClose={handlePopupClose} onUpdateAvatar={handleEditAvatar} />

      {/* Edit Profile popup */}
      <EditProfilePopup isOpen={isEditProfile} onClose={handlePopupClose} onProfileUpdate={handleEditProfile} />

      {/* Add New Card Popup */}
      <AddPlacePopup isOpen={isAddNewCard} onClose={handlePopupClose} handleAddNewCard={handleAddNewCard} />

      {/* Delete card confirmation - not needed yet */}
      <PopupWithForm name="delete" title="Are You Sure?" submitButton="Yes" isOpen={isDeleteCard} onClose={handlePopupClose} onSubmit={handleCardDelete} />

      {/* Expand card on full-screen */}
      <PopupWithImage src={selectedCard.src} title={selectedCard.title} isOpen={isImageExpand} onClose={handlePopupClose} />

    </CurrentUserContext.Provider>
  );
}

export default App;
