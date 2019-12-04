if (
  figma.currentPage.selection.length === 1 &&
  figma.currentPage.selection[0].type === "TEXT"
) {
  // Style text
  const text = (figma.currentPage.selection[0] as TextNode).characters;
} else {
  // Show error for user
}
figma.closePlugin();
