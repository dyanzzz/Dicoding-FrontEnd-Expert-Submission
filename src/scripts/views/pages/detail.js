import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurant-source';
import { createLikeButtonTemplate, createDetailPostContent, createDetailPostContentOverview, createFormReview } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import PostReviewButtonInitiator from '../../utils/post-review-button-initiator';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
	async render() {
		return `
			<div id="restaurant" class="restaurant"></div>
			<div class="restaurant__overview">
				<div id="overview" class="overview"></div>
				<br/>
				<div id="review" class="review"></div>
			</div>
			<div id="likeButtonContainer"></div>
		`;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();

		const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
		const getObjectRestaurant = restaurant.restaurant;

		const restaurantContainer = document.querySelector('#restaurant');
		const overviewContainer = document.querySelector('#overview');
		const reviewContainer = document.querySelector('#review');
		const likeButtonContainer = document.querySelector('#likeButtonContainer');

		restaurantContainer.innerHTML = createDetailPostContent(getObjectRestaurant);
		overviewContainer.innerHTML = createDetailPostContentOverview(getObjectRestaurant);
		reviewContainer.innerHTML = createFormReview(getObjectRestaurant);
		likeButtonContainer.innerHTML = createLikeButtonTemplate();

		LikeButtonInitiator.init({
			likeButtonContainer: likeButtonContainer,
			favoriteRestaurants: FavoriteRestaurantIdb,
			restaurant: {
				id: getObjectRestaurant.id,
				name: getObjectRestaurant.name,
				description: getObjectRestaurant.description,
				pictureId: getObjectRestaurant.pictureId,
				rating: getObjectRestaurant.rating,
				city: getObjectRestaurant.city,
				address: getObjectRestaurant.address,
			},
		});

		const submit = document.querySelector('#submit');
		const formInputName = document.querySelector('#reviewName');
		const formInputReview = document.querySelector('#reviewText');

		submit.addEventListener('click', (e) => {
			const _formInput = {
				name: formInputName.value,
				review: formInputReview.value,
				id: getObjectRestaurant.id,
			};

			e.preventDefault();
			if (navigator.onLine) {
				if (formInputName.value === '' || formInputReview.value === '') {
					alert('Please fill the form');
					formInputName.value = '';
					formInputReview.value = '';
				} else {
					PostReviewButtonInitiator.init({
						formReview: _formInput,
					});
					formInputName.value = '';
					formInputReview.value = '';
				}
			} else {
				alert('Sorry your internet connection is lost, cannot write review');
			}
		});

		console.log('##### Detail restaurant => %o', getObjectRestaurant);
	},
};

export default Detail;
