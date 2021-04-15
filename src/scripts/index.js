import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import data from '../DATA.json';

console.log('Hello Coders! :)');

const menu = document.querySelector('#menu');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const drawer = document.querySelector('#drawer');
const postsGrid = document.querySelector('.posts');

menu.addEventListener('click', function(event){
	drawer.classList.toggle('open');
	
	event.stopPropagation();
});

hero.addEventListener('click', function(){
	drawer.classList.remove('open');
});

main.addEventListener('click', function(){
	drawer.classList.remove('open');
});

let posts = '';
data.restaurants.forEach((restaurant) => {
	posts += `
		<article class="post-item">
			<img class="post-item__thumbnail" src="${restaurant.pictureId}" alt="${restaurant.name}">
			<div class="post-item__content">
				<div class="post-item__tag">
					<div class="post-item__rate">Rate ${restaurant.rating}</div>
					<div class="post-item__city">${restaurant.city}</div>
				</div>
				<a class="post-item__title__anchor" href="/detail/${restaurant.id}" target="_blank">
					<h1 class="post-item__title">
						${restaurant.name}
					</h1>
				</a>
				<p class="post-item__description">${restaurant.description}</p>
				<button class="headline__button">Read More</button>
			</div>
		</article>
	`;
});
postsGrid.innerHTML = posts;

function limitDescription(text, count){
	return text.slice(0, count) + (text.length > count ? "..." : "");
}
