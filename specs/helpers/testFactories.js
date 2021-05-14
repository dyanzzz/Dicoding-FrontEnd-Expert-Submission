import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../../src/scripts/data/favoriterestaurant-idb';

const createLikeButtonInitiatorWithRestaurant = async (restaurant) => {
	await LikeButtonInitiator.init({
		likeButtonContainer: document.querySelector('#likeButtonContainer'),
		favoriteRestaurants: FavoriteRestaurantIdb,
		restaurant,
	});
};

export { createLikeButtonInitiatorWithRestaurant };
