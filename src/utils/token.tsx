export const getToken = () => {
  let token = '';
  document.cookie.split(";").map(
    c => {
      if (c.startsWith("token=")) token = c.split("=")[1]
    }
  );
  return token;
}

export const expireToken = () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
