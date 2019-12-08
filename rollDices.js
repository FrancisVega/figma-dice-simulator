export const d4 = () => {
  const roll = randomNumber(4); // 0 - 3
  const faces = [
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4]
  ];
  return faces[roll].reduce((acc, curr) => acc + curr);
};

export const d6 = () => {
  const roll = randomNumber(6); // 0 - 5
  const faces = [1, 2, 3, 4, 5, 6];
  return faces[roll];
};
