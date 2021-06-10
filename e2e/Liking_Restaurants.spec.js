const assert = require('assert');

Feature('Liking Restaurants');

Before( async ({ I }) => {
  await I.amOnPage('/');
});

Scenario('showing all list restaurant', async ({ I }) => {
  I.seeElement('.post-item');

  const firstRestaurant = locate('.post-item__title__anchor').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  assert.strictEqual(firstRestaurantTitle, 'Melting Pot');
});

Scenario('showing detail restaurant and compare list restaurant and detail restaurant', async ({ I }) => {
  I.seeElement('.post-item');

  const firstTitle = await locate('.post-item__title__anchor').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstTitle);

  I.click(locate('.post-item__title__anchor').first());

  I.seeElement('.restaurant__title');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('should display favorited restaurant in favorite page after adding it into favorite', async ({ I }) => {
  I.seeElement('.post-item');
  
  const firstTitle = locate('.post-item__title__anchor').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstTitle);
  I.click(locate('.post-item__title__anchor').first());

  await I.seeElement('#likeButton');
  I.click('#likeButton');

  await I.amOnPage('/#/favorite');

  I.seeElement('.post-item');
  I.click(locate('.post-item__title__anchor').first());
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('should display favorited restaurant in favorite to unlike it', async ({ I }) => {
  I.seeElement('.post-item');
  I.click(locate('.post-item__title__anchor').first());

  await I.seeElement('#likeButton');
  I.click('#likeButton');

  await I.amOnPage('/#/favorite');

  // unlike process
  I.seeElement('.post-item');
  I.click(locate('.post-item__title__anchor').first());

  await I.seeElement('#likeButton');
  I.click('#likeButton');

  await I.amOnPage('/#/favorite');
  I.seeElement('.posts-not-found');
  const postsNotFound = await I.grabTextFrom('.posts-not-found');
  assert.strictEqual("Favorite restaurant not found", postsNotFound);
});
