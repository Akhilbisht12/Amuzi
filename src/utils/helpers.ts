export const formatVideoLength = (duration: number) => {
  const minute = Math.floor(duration / 60);
  const second = duration % 60;
  return `${minute}:${second <= 9 ? '0' : ''}${second}`;
};
