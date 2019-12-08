figma.showUI(__html__);

const D4DINGBATS = {
  "6": "B",
  "7": "E",
  "8": "I",
  "9": "J"
};
const D6DINGBATS = {
  "1": "!",
  "2": "@",
  "3": "#",
  "4": "$",
  "5": "%",
  "6": "^"
};

figma.ui.onmessage = async message => {
  // Dice dingbata

  // Roll!
  const DICETYPE = message.dice; // d4
  const COUNT = message.count; // 2
  const THRESHOLD = message.threshold; // 7

  switch (DICETYPE) {
    case "d4":
      createTextDiceNode(createD4TextNode, d4, D4DINGBATS, COUNT);
      break;

    case "d6":
      createTextDiceNode(createD6TextNode, d6, D6DINGBATS, COUNT);
      break;
  }
};

// figma.closePlugin();

// -- functions --

function d4() {
  const roll = randomNumber(4); // 0 - 3
  const faces = [
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4]
  ];
  return faces[roll].reduce((acc, curr) => acc + curr);
}

function d6() {
  const roll = randomNumber(6); // 0 - 5
  const faces = [1, 2, 3, 4, 5, 6];
  return faces[roll];
}

async function createD4TextNode(value) {
  await figma.loadFontAsync({
    family: "DPoly Four-Sider",
    style: "Regular"
  });

  const text = figma.createText();

  // const frame = figma.createFrame();
  // frame.appendChild(text);
  text.fontName = { family: "DPoly Four-Sider", style: "Regular" };
  text.fontSize = 60;
  text.characters = value;
  // text.x = x;
}
async function createD6TextNode(value) {
  await figma.loadFontAsync({
    family: "DPoly Six-Sider",
    style: "Regular"
  });

  const text = figma.createText();

  // const frame = figma.createFrame();
  // frame.appendChild(text);
  text.fontName = { family: "DPoly Six-Sider", style: "Regular" };
  text.fontSize = 60;
  text.characters = value;
  // text.x = x;
}
function randomNumber(n) {
  return Math.floor(Math.random() * n);
}

function createTextDiceNode(diceTextNodeFn, diceRoll, diceValues, count) {
  diceTextNodeFn(
    Array(count)
      .fill(null)
      .map(x => diceRoll())
      .map(n => diceValues[n])
      .join(""),
    0
  );
}
