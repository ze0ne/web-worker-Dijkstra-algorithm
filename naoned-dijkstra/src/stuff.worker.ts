export const countDown = (num: number, progress: (p: number) => void) => {
  return new Promise(resolve => {
    let currentNum = 0;
    const tmr = setInterval(() => {
      if (currentNum <= num) {
        progress(currentNum);
        currentNum++;
      } else {
        clearInterval(tmr);
        resolve(num);
      }
    }, 0);
  });
};