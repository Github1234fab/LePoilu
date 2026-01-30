
export async function load({ url, cookies }) {
  const fromAppParam = url.searchParams.get('from_app');

  // If the parameter is present in the URL, verify and set the cookie
  if (fromAppParam === 'true') {
    cookies.set('from_app', 'true', {
      path: '/',
      httpOnly: false, // Allow client-side JS to read if necessary, though data passing is preferred
      maxAge: 60 * 60, // 1 hour
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  // Check if the cookie exists
  const fromAppCookie = cookies.get('from_app');
  const isFromApp = fromAppCookie === 'true' || fromAppParam === 'true';

  return {
    from_app: isFromApp
  };
}
