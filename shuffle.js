const coverName = "cover"

function getNodeRootName(node, sep = "/") {
  const name = node.name.split(sep)
  name.pop()
  return name.join("/")
}

function getMasterComponentsByRootName(node, coverName) {
  const newName = getNodeRootName(node)
  const re = new RegExp(`${newName}\/(?!${coverName})`)
  const components = figma.root.findAll(
    n => n.name.match(re) && n.type === "COMPONENT"
  )
  return components
}

function takeOneComponentRandom(components) {
  const rndIndex = Math.floor(Math.random() * components.length)
  return components[rndIndex]
}

function getOneSelection() {
  try {
    return figma.currentPage.selection[0]
  } catch (e) {
    return undefined
  }
}

function shuffleCard() {
  const sel = getOneSelection()

  if (!sel) {
    figma.notify("Select one card")
  }

  const randomMaster = takeOneComponentRandom(
    getMasterComponentsByRootName(sel, coverName)
  )

  sel.masterComponent = randomMaster
}
