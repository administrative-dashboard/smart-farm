// authUtils.js
  
function getJwtTokenFromCookies() {
  const cookieValue = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('token='));

  if (cookieValue) {
    return cookieValue.split('=')[1];
  }
  
  // const jwtToken = getJwtTokenFromCookies();
  
  // if (jwtToken) {
  //   localStorage.setItem('jwtToken', jwtToken);
  // }
  
}
  export { getJwtTokenFromCookies };
  
  