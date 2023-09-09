// authUtils.js
  
  function getJwtTokenFromCookies() {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
  
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
  
    return null;
  }
  
  const jwtToken = getJwtTokenFromCookies();
  
  if (jwtToken) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  
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
  
  // function saveTokenToCookies(token) {
  //   const expirationDate = new Date();
  //   expirationDate.setDate(expirationDate.getDate() + 7);
  
  //   document.cookie = `jwt=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  // }
  export { parseJwtTokenFromHeaders,  getJwtTokenFromCookies };
  
  