Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing all list restaurant', ({ I }) => {
  I.seeElement('.post-item');

  I.click(locate('.post-item__title__anchor').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item a');
});


Scenario('display favorite restaurant', ({ I }) => {
  I.seeElement('.post-item');
  
  I.click(locate('.post-item__title__anchor').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('.post-item a');
  I.click(locate('.post-item__title__anchor').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
});
