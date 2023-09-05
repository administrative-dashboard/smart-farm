// authUtils.js
function parseJwtTokenFromHeaders(headers) {
    const header = headers.get('Authorization');
    if (header) {
      const tokenMatch = header.match(/^Bearer (.+)$/);
      if (tokenMatch) {
        return tokenMatch[1];
      }
    }
    return null;
  }
  
  function saveTokenToCookies(token) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
  
    document.cookie = `jwt=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  }
  
  function getJwtTokenFromCookies() {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('jwt='));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
  
    return null;
  }
  
  export { parseJwtTokenFromHeaders, saveTokenToCookies, getJwtTokenFromCookies };
  
  