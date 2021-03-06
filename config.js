const DICEFONTS = {
  d4: "DPoly Four-Sider",
  d6: "DPoly Six-Sider",
  d8: "DPoly Eight-Sider",
  d10: "DPoly Ten-Sider",
  d12: "DPoly Twelve-Sider",
  d20: "DPoly Twenty-Sider",
}

const SYMBOLS = {
  d4: { "1": "B", "2": "E", "3": "I", "4": "J" },
  d6: {
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
  },
  d8: {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "E",
    "6": "F",
    "7": "G",
    "8": "H",
  },
  d10: {
    "1": "B",
    "2": "C",
    "3": "D",
    "4": "E",
    "5": "F",
    "6": "G",
    "7": "H",
    "8": "I",
    "9": "J",
    "10": "A",
  },
  d12: {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "E",
    "6": "F",
    "7": "G",
    "8": "H",
    "9": "I",
    "10": "J",
    "11": "K",
    "12": "L",
  },
  d20: {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "E",
    "6": "F",
    "7": "G",
    "8": "H",
    "9": "I",
    "10": "J",
    "11": "K",
    "12": "L",
    "13": "A",
    "14": "B",
    "15": "C",
    "16": "D",
    "17": "E",
    "18": "F",
    "19": "G",
    "20": "H",
  },
}

// -- functions --

const roll = n => Math.ceil(Math.random() * n)

async function createDNTextNode(value, font, sum, threshold, rollValues) {
  await figma.loadFontAsync({
    family: font,
    style: "Regular",
  })
  const text = figma.currentPage.findOne(n => n.name === "__MAT__")
  text.fontName = { family: font, style: "Regular" }
  text.characters = value

  // paint
  let failValues = 0
  rollValues.forEach((x, idx) => {
    if (x < threshold) {
      failValues = failValues + x
      paintChar(text, idx + 1, { r: 0.4, g: 0.4, b: 0.4 })
    } else {
      paintChar(text, idx + 1, { r: 0, g: 0, b: 0 })
    }
  })

  if (threshold > 0) {
    await createSumTextNode(sum - failValues)
  } else {
    await createSumTextNode(sum)
  }
}

async function createSumTextNode(value) {
  await figma.loadFontAsync({
    family: "Roboto",
    style: "Regular",
  })
  const sumText = figma.currentPage.findOne(n => n.name === "__SUM__")
  sumText.fontName = { family: "Roboto", style: "Regular" }
  sumText.characters = value <= 0 ? "" : value.toString()
}

function createTextDiceNode({
  diceType,
  count,
  faces,
  sortDices = false,
  showSum = false,
  threshold = 0,
}) {
  // [8, 4, 2, 9, 1, rnd...]
  // sort ?
  const value = Array(count)
    .fill(null)
    .map(x => roll(faces))
    .sort((a, b) => (sortDices ? (a > b ? 1 : -1) : 1))

  // Suma de toda la tirada
  const sum = value.reduce((a, b) => a + b, 0)

  // Crea una capa de texto
  createDNTextNode(
    value.map(n => SYMBOLS[diceType][n]).join(""),
    DICEFONTS[diceType],
    showSum ? sum : "",
    threshold,
    value
  )
}

// Añade un fill color a un caracter de un nodo de texto en una posición
// concreta.
function paintChar(text, pos, col) {
  text.setRangeFills(pos - 1, pos, [{ type: "SOLID", color: col }])
}

const faces = str => parseInt(str.split(/d/)[1])

export { createTextDiceNode, faces }
