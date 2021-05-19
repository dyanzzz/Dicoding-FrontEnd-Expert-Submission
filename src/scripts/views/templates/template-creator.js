import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

function limitDescription(text, count) {
	return text.slice(0, count) + (text.length > count ? '...' : '');
}

const createLatestContent = (restaurant) => `
	<article class="post-item">
		<img class="post-item__thumbnail lazyload" src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_S_URL + '/' + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.name}">
		<div class="post-item__content">
			<div class="post-item__tag">
				<div class="post-item__rate">Rate ${restaurant.rating}</div>
				<div class="post-item__city">${restaurant.city}</div>
			</div>
			<a class="post-item__title__anchor" href="/#/detail/${restaurant.id}" >${restaurant.name}</a>
			<p class="post-item__description">${limitDescription(restaurant.description, 200)}</p>
		</div>
	</article>
`;

const createDetailPostContent = (restaurant) => `
	<h2 class="restaurant__title">${restaurant.name}</h2>
	<img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_L_URL + '/' + restaurant.pictureId}" alt="${restaurant.name}" />
	<div class="restaurant__info">
		<h2 class="restaurant__title">Information</h2>

		<h4>City</h4>
		<p>${restaurant.city}</p>
		
		<h4>address</h4>
		<p>${restaurant.address}</p>

		<h4>Rating</h4>
		<p>Rate ${restaurant.rating}</p>

		<h4>Category</h4>
		<p>
			<ul class="tags">
				${restaurant.categories.map((category) => `
					<li>
						<div class="tag">${category.name}</div>
					</li>
				`).join('')}
			</ul>
		</p>
		
	</div>
`;

const createDetailPostContentOverview = (restaurant) => `
	<br/>

	<h2 class="restaurant__title">Description</h2>
	<p>${restaurant.description}</p>

	<br/>

	<h2 class="restaurant__title">Menus</h2>
	<h3>Foods</h3>
	<p>
		<ul class="tags">
			${restaurant.menus.foods.map((food) => `
			<li>
				<div class="tag">${food.name}</div>
			</li>
			`).join('')}
		</ul>
	</p>
	<h3>Drinks</h3>
	<p>
		<ul class="tags">
			${restaurant.menus.drinks.map((drink) => `
			<li>
				<div class="tag">${drink.name}</div>
			</li>
			`).join('')}
		</ul>
	</p>
`;

const createFormReview = (restaurant) => `
	<h2 class="restaurant__title">Reviews</h2>
	<p>
		<div class="form-container">
			<form action="#">
				<div class="form-row">
					<div class="form-col-25">
						<label for="name">Name</label>
					</div>
					<div class="form-col-75">
						<input type="text" id="reviewName" name="name" placeholder="Your name.." required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-col-25">
						<label for="review">Review</label>
					</div>
					<div class="form-col-75">
						<textarea id="reviewText" name="review" placeholder="Write something.." style="height:100px" required ></textarea>
					</div>
				</div>
				
				<div class="form-row">
					<input type="button" id="submit" value="Submit">
				</div>
			</form>
		</div>
	</p>

	<p class="detail-review">
		${restaurant.customerReviews.reverse().map((review) => `
			<div class="row">
				<div class="side">
					<i class="fa fa-check" aria-hidden="true"></i> ${review.name}
				</div>
				<div class="middle">
					${review.review}
				</div>
				<div class="side right">
					${review.date}
				</div>
			</div>
		`).join('')}
	</p>
`;

const createLikeButtonTemplate = () => `
	<button aria-label="like this restaurant" id="likeButton" class="like">
		<i class="far fa-heart" aria-hidden="true"></i>
	</button>
`;

const createLikedButtonTemplate = () => `
	<button aria-label="unlike this restaurant" id="likeButton" class="like">
		<i class="fas fa-heart" aria-hidden="true"></i>
	</button>
`;

export {
	createLatestContent,
	createDetailPostContent,
	createDetailPostContentOverview,
	createFormReview,
	createLikeButtonTemplate,
	createLikedButtonTemplate,
};
