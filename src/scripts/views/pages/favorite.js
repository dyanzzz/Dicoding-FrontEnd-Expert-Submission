import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createLatestContent } from '../templates/template-creator';

const Favorite = {
	async render() {
		return `
			<div class="content">
				<h2 class="content__heading">I Liked This Restaurants</h2>
				<div id="posts" class="posts">
				
				</div>
			</div>
		`;
	},

	async afterRender() {
		const resturants = await FavoriteRestaurantIdb.getAllRestaurants();
		const resturantsContainer = document.querySelector('.posts');
		resturants.forEach((resturant) => {
			resturantsContainer.innerHTML += createLatestContent(resturant);
		});
	},
	
};

export default Favorite;