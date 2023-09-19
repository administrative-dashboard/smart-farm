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
  
  // const jwtToken = getJwtTokenFromCookies();
  
  // if (jwtToken) {
  //   localStorage.setItem('jwtToken', jwtToken);
  // }
  
  function getUserInfoFromCookies() {
    const jwtToken = getJwtTokenFromCookies();
  
    if (jwtToken) {
      try {
        // Decode the JWT token
        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = JSON.parse(atob(base64));
  
        // Extract user information
        const { user_id, role, email } = decodedData;
  
        return { user_id, role, email };
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  
    return null;
  }
  
  export { getUserInfoFromCookies,  getJwtTokenFromCookies };
  
  