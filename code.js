figma.showUI(__html__)

const DICEFONTS = {
  d4: "DPoly Four-Sider",
  d6: "DPoly Six-Sider",
  d8: "DPoly Eight-Sider",
  d10: "DPoly Ten-Sider",
  d12: "DPoly Twelve-Sider",
  d20: "DPoly Twenty-Sider"
}

const SYMBOLS = {
  d4: { "6": "B", "7": "E", "8": "I", "9": "J" },
  d6: {
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^"
  },
  d8: {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "5": "E",
    "6": "F",
    "7": "G",
    "8": "H"
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
    "10": "A"
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
    "12": "L"
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
    "20": "H"
  }
}
figma.ui.onmessage = async (message) => {
  // Roll!
  const DICETYPE = message.dice // d4
  const COUNT = message.count // 2
  const THRESHOLD = message.threshold // 7
  const SORTDICES = message.sortDices // bool
  console.log(SORTDICES)

  switch (DICETYPE) {
    case "d4":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 4,
        start: 6,
        sortDices: SORTDICES
      })
      break
    case "d6":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 6,
        start: 1,
        sortDices: SORTDICES
      })
      break
    case "d8":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 8,
        start: 1,
        sortDices: SORTDICES
      })
      break
    case "d10":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 10,
        start: 1,
        sortDices: SORTDICES
      })
      break
    case "d12":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 12,
        start: 1,
        sortDices: SORTDICES
      })
      break
    case "d20":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 20,
        start: 1,
        sortDices: SORTDICES
      })
      break
  }
}

// -- functions --

const roll = (n, start = 1) => Math.ceil(Math.random() * n) + start - 1
async function createDNTextNode(value, font) {
  await figma.loadFontAsync({
    family: font,
    style: "Regular"
  })
  const text = figma.createText()
  text.fontName = { family: font, style: "Regular" }
  text.fontSize = 60
  text.characters = value
}

function createTextDiceNode({ diceType, fn, count, font, faces, start, sortDices = false }) {
  fn(
    Array(count)
      .fill(null)
      .map((x) => roll(faces, start))
      .sort((a, b) => (sortDices ? (a > b ? 1 : -1) : 1))
      .map((n) => SYMBOLS[diceType][n])
      .join(""),
    DICEFONTS[diceType]
  )
}
