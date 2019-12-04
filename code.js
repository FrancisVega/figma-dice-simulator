figma.showUI(__html__);
figma.ui.onmessage = message => {
  console.log("got this from the UI", message);
  const names = ["1", "2", "3", "4", "5", "6"];
  const rng = Math.floor(Math.random() * 6);
  const diceLayers = figma.currentPage.children.filter(node =>
    names.includes(node.name)
  );
  diceLayers.forEach(l => (l.visible = false));
  diceLayers[rng].visible = true;
};
// figma.closePlugin();
