const dice = "d20"

const faces = str => parseInt(str.split(/d/)[1])

console.log(faces(dice))
