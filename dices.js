// const randomNumber = n => Math.floor(Math.random() * n);

// const d4 = ({ threshold = 0 }) => {
//   const roll = randomNumber(4); // 0 - 3
//   const faces = [
//     [1, 2, 3],
//     [1, 2, 4],
//     [1, 3, 4],
//     [2, 3, 4]
//   ];
//   const sum = faces[roll].reduce((acc, curr) => acc + curr);
//   return sum < threshold ? [...faces[roll], "FAIL!"] : faces[roll];
// };

// const d6 = ({ threshold = 0 }) => {
//   const roll = randomNumber(6); // 0 - 5
//   const faces = [1, 2, 3, 4, 5, 6];
//   return faces[roll] < threshold ? "fail" : faces[roll];
// };
