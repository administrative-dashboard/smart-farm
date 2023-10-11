// authUtils.js

function getJwtTokenFromCookies() {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }

}
export { getJwtTokenFromCookies };
