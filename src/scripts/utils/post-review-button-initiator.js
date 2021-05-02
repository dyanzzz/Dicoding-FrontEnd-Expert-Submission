import RestaurantResource from '../data/restaurant-source';
import NotificationHelper from './notification-helper';

const PostReviewButtonInitiator = {
	async init({ formReview }) {
		await RestaurantResource.reviewRestaurant(formReview);

		const reviewContainer = document.querySelector('.detail-review');
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date().toLocaleDateString('id-ID', options);

		const newReview = `
			<div class="row">
				<div class="side">
					<i class="fa fa-check" aria-hidden="true"></i> ${formReview.name}
				</div>
				<div class="middle">
					${formReview.review}
				</div>
				<div class="side right">
					${date}
				</div>
			</div>
		`;
		reviewContainer.innerHTML += newReview;
		this._onMessageHandler(formReview);
	},

	_onMessageHandler(review) {
		NotificationHelper.sendNotification({
			title: `Thanks ${review.name} for your review`,
			options: {
				body: review.review,
			},
		});
	},

};

export default PostReviewButtonInitiator;
