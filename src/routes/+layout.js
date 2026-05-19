import { prerendering } from '$app/environment';

export async function load({ url }) {
	if (prerendering) {
		return {
			from_app: false
		};
	}

	const fromAppParam = url.searchParams.get('from_app');
	return {
		from_app: fromAppParam === 'true'
	};
}
