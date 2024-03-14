import { browser } from '$app/environment';

export const current_location = new Promise((resolve) => {
	const location: { lat: number; lon: number } = { lat: 0, lon: 0 }; //TODO-probably-bad-practice
	if (browser) {
		window.navigator.geolocation.getCurrentPosition(
			(pos) => {
				location.lat = pos.coords.latitude;
				location.lon = pos.coords.longitude;
			},
			(err) => {
				resolve(err);
			},
			{
				enableHighAccuracy: true
			}
		);
	} else {
		resolve('current context not browser');
	}
	resolve(location);
});
