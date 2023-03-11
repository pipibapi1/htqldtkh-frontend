export default function authHeader() {
    const user = localStorage.getItem("user");
    if (user !== null && JSON.parse(user).token) {
      return { authorization: "Bearer " + JSON.parse(user).token};
    } else {
      return {};
    }
  }