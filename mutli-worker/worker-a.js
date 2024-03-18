onmessage = e => {
  const { username, password } = e.data;
  console.log('Worker A');
  if (password.toString().length > 6) {
    postMessage({ cmd: 'passwordIsValid', isValid: true });
  }
};
