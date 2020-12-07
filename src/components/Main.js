import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  //collect info from server: user info
  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserAvatar(res.avatar);
        setUserName(res.name);
        setUserDescription(res.about);
      })
      .catch(err => console.log(err));

    api.getInitialCards()
      .then((res) => {
        setCards(res.map((cardItem) => ({
          alt: cardItem.name,
          title: cardItem.name,
          src: cardItem.link,
          id: cardItem._id,
          likes: cardItem.likes
        })));
      })
      .catch(err => console.log(err));
  }, []);


  return(
    <>
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img src={userAvatar} alt="profile-pic" className="profile__photo" />
          <button type="button" aria-label="edit-avatar" className="profile__photo_edit" onClick={props.handleEditAvatarBtn}></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" aria-label="edit-profile" className="profile__edit" onClick={props.handleEditProfileBtn}></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button aria-label="add-card-button" className="add-button" onClick={props.handleAddCardBtn}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card, id) =>
              <Card
                key={id}
                alt={card.alt}
                src={card.src}
                title={card.title}
                likes={card.likes}
                handleCardClick={() => props.handleCardClick(card)}
              />
            )
          }
        </ul>
      </section>
    </main>

    {/* Edit avatar popup */}
    <PopupWithForm name="edit-avatar" title="Change Profile Picture" submitButton="Save" isOpen={props.isEditAvatar} onClose={props.onClose} >
      <input id="avatar-url" type="url" name="link" onChange={props.handleAvatarUpdate} className="form__input form__input_type_avatar-url" placeholder="Avatar link" required />
      <span id="avatar-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>

    {/* Edit Profile popup */}
    <PopupWithForm name="edit-profile" title="Edit Profile" submitButton="Save" isOpen={props.isEditProfile} onClose={props.onClose} >
      <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Name" minLength="2" maxLength="30" required />
      <span id="card-title-error" className="form__field form__field_error"></span>
      <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="About Me" required />
      <span id="card-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>

    {/* Add New Card Popup */}
    <PopupWithForm name="add-card" title="New Place" submitButton="Save" isOpen={props.isAddNewCard} onClose={props.onClose}>
      <input id="card-title" type="text" name="name" className="form__input form__input_type_card-title" placeholder="Title" minLength="2" maxLength="30" required />
      <span id="card-title-error" className="form__field form__field_error"></span>
      <input id="card-url" type="url" name="link" className="form__input form__input_type_card-url" placeholder="Image link" required />
      <span id="card-url-error" className="form__field form__field_error"></span>
    </PopupWithForm>

    {/* Delete card confirmation */}
    <PopupWithForm name="delete" title="Are You Sure?" submitButton="Yes" isOpen={props.isDeleteCard} onClose={props.onClose} />

    {/* Expand card on full-screen */}
    <PopupWithImage src={props.selectedCard.src} title={props.selectedCard.title} isOpen={props.isImageExpand} onClose={props.onClose} />

    </>
  )
}


export default Main;

