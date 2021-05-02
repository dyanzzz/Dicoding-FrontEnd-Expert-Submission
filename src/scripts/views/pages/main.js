import RestaurantResource from '../../data/restaurant-source';
import { createLatestContent } from '../templates/template-creator';

const Main = {
	async render() {
		return `
			<div class="hero">
				<div class="hero__inner">
					<h1 class="hero__title">
						Discover the best food & drinks in Jakarta
					</h1>
					<p class="hero__tagline">
						Enjoy great meals at home!
					</p>
				</div>
			</div>
			
			<div class="head">
				<article class="headline">
					<figure class="headline__figure">
						<img src="images/headline/restaurant.png" alt="">
					</figure>
					<div class="headline__content">
						<h1 class="headline__title">
							Your food can come to you!
						</h1>
						<p class="headline__description">
							View delivery restaurants
						</p>
						<button class="headline__button">Read More</button>
					</div>
				</article>
				<article class="headline">
					<figure class="headline__figure">
						<img src="images/headline/food.png" alt="">
					</figure>
					<div class="headline__content">
						<h1 class="headline__title">
							Enjoy great meals at home!
						</h1>
						<p class="headline__description">
							View takeaway restaurants
						</p>
						<button class="headline__button">Read More</button>
					</div>
				</article>
			</div>
			
			<section class="content">
				<div class="latest">
					<h1 class="latest__label">Latest Post</h1>
					<div class="posts">

					</div>
				</div>
			</section>
		`;
	},

	async afterRender() {
		const restaurants = await RestaurantResource.main();
		console.log(restaurants);

		const restaurantContainer = document.querySelector('.posts');
		restaurants.forEach((restaurant) => {
			restaurantContainer.innerHTML += createLatestContent(restaurant);
		});
	},

};

export default Main;
