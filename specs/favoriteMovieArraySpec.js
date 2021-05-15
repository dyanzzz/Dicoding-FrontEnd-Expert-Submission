import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';


let favoriteRestaurants = [];

const FavoriteRestaurantArray = {

	getRestaurant(id) {
		if (!id) {
			return;
		}

		return favoriteRestaurants.find((restaurant) => restaurant.id == id);
	},

	getAllRestaurants() {
		return favoriteRestaurants;
	},

	putRestaurant(restaurant) {
		if (!restaurant.hasOwnProperty('id')) {
			return;
		}

		// pastikan id ini belum ada dalam daftar favoriteMovies
		if (this.getRestaurant(restaurant.id)) {
			return;
		}

		favoriteRestaurants.push(restaurant);
	},

	deleteRestaurant(id) {
		// cara boros menghapus film dengan meng-copy film yang ada
		// kecuali film dengan id == id
		favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
	},

  async searchRestaurants(query) {
		return (await this.getAllRestaurants()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const restaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const setQuery = loweredCaseQuery.replace(/\s/g, '');

      return restaurantName.indexOf(setQuery) !== -1;
    });
	},
};

describe('Favorite restaurant Array Contract Test Implementation', () => {
	afterEach(() => favoriteRestaurants = []);

	itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
