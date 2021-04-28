import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantResource {
	static async main() {
		const response = await fetch(API_ENDPOINT.LIST);
		const responseJson = await response.json();
		return responseJson.restaurants;
	}

	static async detailRestaurant(id) {
		const response = await fetch(API_ENDPOINT.DETAIL(id));
		return response.json();
	}

	static async reviewRestaurant(data) {
		const response = await fetch(API_ENDPOINT.REVIEW, {
			method: "post",
			headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
			body: JSON.stringify(data),
		});
		return response;

	}
}

export default RestaurantResource;