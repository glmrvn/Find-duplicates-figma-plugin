// ----------------------------------FIGMA OBJECTS-------------------------------------

const frames = figma.currentPage.findAll(node => node.type === "FRAME" && node.parent.type != "FRAME")
const components = figma.currentPage.findAll(node => node.type === "COMPONENT" && node.parent.type != "COMPONENT")
const instances = figma.currentPage.findAll(node => node.type === "INSTANCE" && node.parent.type != "INSTANCE" && node.parent.type != "FRAME" && node.parent.type != "COMPONENT")
const allNodes = [...frames, ...instances, ...components]

// ----------------------------------FIND DUPLICATES------------------------------------

var duplicates = Object.values(allNodes.reduce((c, v) => {
    let name = v.name;

    c[name] = c[name] || [];
    c[name].push(v);
    return c;
  }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);

// ----------------------------------SELECT OBJECTS-------------------------------------
if (duplicates.length > 0) {
  figma.currentPage.selection = duplicates
  figma.viewport.scrollAndZoomIntoView(duplicates)
  figma.closePlugin("🚨Duplicates")
} else {
  figma.closePlugin("👌You don't have duplicates")
}