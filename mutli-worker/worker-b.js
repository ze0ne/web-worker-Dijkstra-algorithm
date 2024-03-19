onmessage = (e) => {
  console.log("Worker B");
  const { username } = e.data;
  const isValid = !/[!@#$%]/.test(username);
  postMessage({ cmd: "usernameIsValid", isValid });
};
