export const getRandomItems = <T>(items: T[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const getRandomTimestamp = () => {
  const now = new Date();
  const offset = Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000); // random offset: up to last 7 days (in ms)
  const randomDate = new Date(now.getTime() - offset);
  return randomDate.toISOString();
};
