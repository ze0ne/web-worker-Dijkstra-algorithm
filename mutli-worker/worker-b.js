onmessage = e => {
  const { username } = e.data;
  const isValid = !/[!@#$%]/.test(username);
  postMessage({ cmd: 'usernameIsValid', isValid });
};
