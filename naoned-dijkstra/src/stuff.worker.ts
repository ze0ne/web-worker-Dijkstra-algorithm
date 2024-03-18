export const countUp = (num: number, progress: (p: number) => void) => {
  return new Promise(resolve => {
    for (let currentNum = 0; currentNum <= num; currentNum++) {
      progress(currentNum);
    }
    resolve(num);
  });
};
export const countUpInterval = (num: number, progress: (p: number) => void) => {
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
