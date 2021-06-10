import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createLatestContent } from '../templates/template-creator';

const Favorite = {
	async render() {
		return `
			<div class="content">
				<h2 class="content__heading">I Liked This Restaurants</h2>
				<div id="posts" class="posts">
				
				</div>
				<div id="posts-not-found" class="posts-not-found">
					<center><h2>Favorite restaurant not found</h2></center>
				</div>
			</div>
		`;
	},

	async afterRender() {
		const resturants = await FavoriteRestaurantIdb.getAllRestaurants();
		const restaurantsContainer = document.querySelector('.posts');
		const restaurantsNotFoundContainer = document.querySelector('.posts-not-found');
		resturants.forEach((resturant) => {
			if (resturant) {
				restaurantsContainer.style.visibility = "visible";
				restaurantsNotFoundContainer.style.visibility = "hidden";
				restaurantsContainer.innerHTML += createLatestContent(resturant);
			} else {
				restaurantsContainer.style.visibility = "hidden";
				restaurantsNotFoundContainer.style.visibility = "visible";
			}
		});
	},

};

export default Favorite;
