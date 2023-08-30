export const TimeOut = (s, t) => {
  const timeoutPromise = new Promise((__, rej) => {
    setTimeout(() => {
      rej(`${t ? `${t} ` : "Request"} took too long!`);
    }, s * 1000);
  });
  return timeoutPromise;
};
