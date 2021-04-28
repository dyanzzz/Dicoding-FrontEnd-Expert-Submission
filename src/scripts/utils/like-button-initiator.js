import FavoriteRestaurantIdb from "../data/favoriterestaurant-idb";
import NotificationHelper from './notification-helper';
import CONFIG from "../globals/config"
import { createLikeButtonTemplate, createLikedButtonTemplate } from "../views/templates/template-creator";

const LikeButtonInitiator = {
	async init({ likeButtonContainer, restaurant }) {
		this._likeButtonContainer = likeButtonContainer;
		this._restaurant = restaurant;

		await this._renderButton();
	},

	async _renderButton() {
		const { id } = this._restaurant;

		if(await this._isRestaurantExist(id)) {
			this._renderLiked();
		} else {
			this._renderLike();
		}
	},

	async _isRestaurantExist(id) {
		const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
		return !!restaurant;
	},

	_renderLike() {
		this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

		const likeButton = document.querySelector('#likeButton');
		likeButton.addEventListener('click', async () => {
			await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
			this._onMessageHandler(this._restaurant, "like");
			this._renderButton();
		});
	},

	_renderLiked() {
		this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

		const likeButton = document.querySelector('#likeButton');
		likeButton.addEventListener('click', async () => {
			await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
			this._onMessageHandler(this._restaurant, "don't like");
			this._renderButton();
		});
	},

	_onMessageHandler(restaurant, event) {
    NotificationHelper.sendNotification({
      title: `I ${event} restaurant ${restaurant.name}`,
      options: {
        body: restaurant.description,
        image: `${CONFIG.BASE_IMAGE_M_URL + '/' + restaurant.pictureId}`,
      },
    });
  },

};

export default LikeButtonInitiator;
