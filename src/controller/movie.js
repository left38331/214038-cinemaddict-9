import Card from "../components/film-card";
import CardPopup from "../components/film-detais";
import UserRating from "../components/user-rating";
import {Position, render, AUTHORIZATION, END_POINT} from "../utils";
import CommentsList from "../components/comments-list";
import {API} from "../server";

export default class MovieController {
  constructor(container, data, onDataChange) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._card = new Card(data);
    this._cardPopup = new CardPopup(data);
    this._commentsBlock = ``;
    this._api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
    this._renderComments = this._renderComments.bind(this);

    this.init();
    // this._filmRating(this._data);
  }

  init() {
    this._card.getElement().addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`film-card__poster`) || e.target.classList.contains(`film-card__title`) || e.target.classList.contains(`film-card__comments`)) {
        this._renderPopup();
      }
    });

    const allInputs = this._cardPopup.getElement().querySelectorAll(`.film-details__controls .film-details__control-input`);
    const allAddButtons = this._card.getElement().querySelectorAll(`.film-card__controls-item`);
    const entry = this._data;

    allInputs.forEach((input) => input.addEventListener(`click`, () => {
      entry[input.id] = input.checked;
      this._onDataChange(`update`, entry);
    }));

    allAddButtons.forEach((button) => button.addEventListener(`click`, (e) => {
      const buttonIdentifier = button.textContent.split(/\W+/g)[2];

      e.preventDefault();
      entry[buttonIdentifier] = !this._data[buttonIdentifier];
      this._onDataChange(`update`, entry);
    }));

    render(this._container.querySelector(`.films-list__container`), this._card.getElement());
  }

  _renderComments() {
    const commentsList = this._cardPopup.getElement().querySelector(`.form-details__bottom-container`);

    this._api.getComments(this._data[`id`])
      .then((response) => {
        this._commentsBlock = new CommentsList(response);
        render(commentsList, this._commentsBlock.getElement());
        this._removeComment();

        // const commentInput = this._cardPopup.getElement().querySelector(`.film-details__comment-input`);

        // commentInput.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeyDown));
        // commentInput.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeyDown));
      });
  }

  _renderPopup() {
    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        this._cardPopup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onClickClose = (e) => {
      if (e.target.classList.contains(`film-details__close-btn`)) {
        this._cardPopup.removeElement();
      }
    };

    render(document.querySelector(`body`), this._cardPopup.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener(`click`, onClickClose);
    this._renderComments();
  }

  // _filmRating(film) {
  //   const buttonWatched = this._cardPopup.getElement().querySelector(`#watched`);
  //   const userRating = new UserRating(film);
  //
  //   buttonWatched.addEventListener(`click`, () => {
  //     if (buttonWatched.checked === true) {
  //       const sectionTop = this._cardPopup.getElement().querySelector(`.form-details__bottom-container`);
  //
  //       render(sectionTop, userRating.getElement(), Position.INSERTBEFORE);
  //     } else {
  //       document.querySelector(`.form-details__middle-container`).remove();
  //     }
  //   });
  // }

  // _addEmogi() {
  //   const allEmoji = this._cardPopup.getElement().querySelectorAll(`.film-details__emoji-list`);
  //
  //   allEmoji.forEach((emoji) => {
  //     emoji.addEventListener(`click`, (e) => {
  //       const imgContainer = this._cardPopup.getElement().querySelector(`.film-details__add-emoji-label`);
  //
  //       if (e.target.tagName === `INPUT`) {
  //         const imgElement = `<img id="${e.target.value}" src="./images/emoji/${e.target.value}.png" width="55" height="55" alt="emoji">`;
  //
  //         imgContainer.innerHTML = ``;
  //         imgContainer.insertAdjacentHTML(`beforeend`, imgElement);
  //       }
  //     });
  //   });
  // }

  // _addComment() {
  //   const textAreaComment = this._cardPopup.getElement().querySelector(`.film-details__comment-input`);
  //   const commentsList = this._cardPopup.getElement().querySelector(`.film-details__comments-list`);
  //   const onEnterKeyDown = (e) => {
  //     if ((e.ctrlKey) && ((e.keyCode === 0xA) || (e.keyCode === 0xD))) {
  //       const imgAdress = this._cardPopup.getElement().querySelector(`.film-details__add-emoji-label`).firstChild.id;
  //       const comment = `<li class="film-details__comment">
  //                       <span class="film-details__comment-emoji">
  //                         <img src="./images/emoji/${imgAdress}.png" width="55" height="55" alt="emoji">
  //                       </span>
  //                       <div>
  //                         <p class="film-details__comment-text">${textAreaComment.value}</p>
  //                         <p class="film-details__comment-info">
  //                           <span class="film-details__comment-author">Egor Perkhalsky</span>
  //                           <span class="film-details__comment-day">${new Date()}</span>
  //                           <button class="film-details__comment-delete">Delete</button>
  //                         </p>
  //                       </div>
  //                     </li>`;
  //
  //       const entry = this._data;
  //
  //       commentsList.insertAdjacentHTML(`beforeend`, comment);
  //       this._cardPopup.getElement().querySelector(`.film-details__comments-count`).innerHTML = this._cardPopup.getElement().querySelectorAll(`.film-details__comment`).length;
  //
  //       entry.comments.push({
  //         text: textAreaComment.value,
  //         emotion: imgAdress + `.png`,
  //         author: `Egor Perkhalsky`,
  //         date: new Date()
  //       });
  //
  //       this._onDataChange(entry, this._data);
  //     }
  //   };
  //
  //   textAreaComment.addEventListener(`keydown`, onEnterKeyDown);
  // }

  _removeComment() {
    const allDellBtnComments = this._commentsBlock.getElement().querySelectorAll(`.film-details__comment-delete`);

    allDellBtnComments.forEach((btn) => {
      btn.addEventListener(`click`, (e) => {
        const commentId = e.target.closest(`.film-details__comment`).getAttribute(`data-id-comment`);

        e.preventDefault();
        document.querySelector(`.film-details__comments-wrap`).remove();
        this._onDataChange(`delete`, commentId, this._renderComments);
      });
    });
  }
}
