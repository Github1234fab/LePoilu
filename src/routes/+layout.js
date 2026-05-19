export async function load({ url }) {
	const fromAppParam = url.searchParams.get('from_app');
	return {
		from_app: fromAppParam === 'true'
	};
}
