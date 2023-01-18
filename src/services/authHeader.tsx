export default function authHeader() {
    const user = localStorage.getItem("user");
  
    if (user !== null && JSON.parse(user).accessToken) {

      return { Authorization: "Bearer " + JSON.parse(user).accessToken};
  
    //   return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }