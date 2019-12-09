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
  d4: { "1": "B", "2": "E", "3": "I", "4": "J" },
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
  const SHOWSUM = message.showSum // bool
  const SORTDICES = message.sortDices // bool

  switch (DICETYPE) {
    case "d4":
      createTextDiceNode({
        fn: createDNTextNode,
        diceType: DICETYPE,
        count: COUNT,
        faces: 4,
        start: 1,
        showSum: SHOWSUM,
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
        showSum: SHOWSUM,
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
        showSum: SHOWSUM,
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
        showSum: SHOWSUM,
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
        showSum: SHOWSUM,
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
        showSum: SHOWSUM,
        sortDices: SORTDICES
      })
      break
  }
}

// -- functions --

const roll = (n, start = 1) => Math.ceil(Math.random() * n) + start - 1

async function createDNTextNode(value, font, sum) {
  await figma.loadFontAsync({
    family: font,
    style: "Regular"
  })
  const text = figma.currentPage.findOne((n) => n.name === "__MAT__")
  text.fontName = { family: font, style: "Regular" }
  text.characters = value
  text.fontSize = 60
  await createSumTextNode(sum)
}

async function createSumTextNode(value) {
  await figma.loadFontAsync({
    family: "Roboto",
    style: "Regular"
  })
  const sumText = figma.currentPage.findOne((n) => n.name === "__SUM__")
  sumText.fontName = { family: "Roboto", style: "Regular" }
  sumText.characters = value.toString()
  sumText.fontSize = 20
}

function createTextDiceNode({ diceType, fn, count, font, faces, start, sortDices = false, showSum }) {
  const value = Array(count)
    .fill(null)
    .map((x) => roll(faces, start))
    .sort((a, b) => (sortDices ? (a > b ? 1 : -1) : 1))

  const sum = value.reduce((a, b) => a + b, 0)
  figma.ui.postMessage(showSum ? sum : "")

  fn(value.map((n) => SYMBOLS[diceType][n]).join(""), DICEFONTS[diceType], showSum ? sum : "")
}
