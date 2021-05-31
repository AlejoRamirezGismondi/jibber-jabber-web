export const getToken = () => {
  let token = '';
  document.cookie.split(";").map(
    c => {
      if (c.startsWith("token=")) token = c.split("=")[1]
    }
  );
  return token;
}
