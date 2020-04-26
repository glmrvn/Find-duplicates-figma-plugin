// ----------------------------------FIGMA OBJECTS-------------------------------------

const frames = figma.currentPage.findAll(node => node.type === "FRAME" && node.parent.type != "FRAME")
const instances = figma.currentPage.findAll(node => node.type === "INSTANCE" && node.parent.type != "INSTANCE" && node.parent.type != "FRAME")
const groups = figma.currentPage.findAll(node => node.type === "GROUP" && node.parent.type === "PAGE")

const allNodes = [...frames, ...instances, ...groups]

// ----------------------------------FIND DUPLICATES------------------------------------

var duplicates = Object.values(allNodes.reduce((c, v) => {
    let name = v.name;

    c[name] = c[name] || [];
    c[name].push(v);
    return c;
  }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);

// ----------------------------------SELECT OBJECTS-------------------------------------

figma.currentPage.selection = duplicates
figma.closePlugin()