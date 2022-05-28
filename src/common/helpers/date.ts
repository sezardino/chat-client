export const getDate = (stamp: number) => {
  const today = new Date();
  const date = new Date(stamp);

  if (today.getDate() !== date.getDate()) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todayYear = today.getFullYear();
    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}${
      todayYear === year ? "" : `.${year}`
    }`;
  }

  return date.toLocaleDateString();
};
