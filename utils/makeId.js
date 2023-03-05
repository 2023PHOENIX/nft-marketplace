export const makeId = (length) => {
  let result = "";

  const character = "abcdefghijklmnopqrstuvwxyz0123456789";
  const characterLength = character.length;

  for (let i = 0; i < length; i++) {
    result += character.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
};
