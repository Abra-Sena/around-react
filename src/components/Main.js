import React from 'react';
import api from '../utils/Api';
import Card from './Card';


function Main(props) {
  const [cards, setCards] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  //collect info from server
  React.useEffect(() => {
    // promise all about user before rendering data to page
    api.getAppInfo()
    .then(([userData, initialCards]) => {
      // user info
      setUserAvatar(userData.avatar);
      setUserName(userData.name);
      setUserDescription(userData.about);

      // cards
      setCards(initialCards.map((cardItem) => ({
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
    </>
  )
}


export default Main;

