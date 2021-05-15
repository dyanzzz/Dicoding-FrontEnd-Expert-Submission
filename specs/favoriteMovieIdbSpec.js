import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';

describe('Favorite restaurant idb contract test implementation', () => {
	afterEach(async () => {
		(await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
			await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
		});
	});

	itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
