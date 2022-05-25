const { select, selectAll, json, hierarchy, tree, linkHorizontal } = d3

const svg = select("svg")

const width = document.body.clientWidth
const height = document.body.clientHeight

const margin = { top: 0, right: 160, bottom: 0, left: 0 }
const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const treeLayout = tree().size([innerHeight, innerWidth])

const g = svg
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`)

g.attr("width", width).attr("height", height)
json("data.json").then((data) => {
  const root = hierarchy(data)
  const links = treeLayout(root).links()
  const linkPathGenerator = linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x)
  g.selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("d", linkPathGenerator)
  g.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .attr("alignment-baseline", "central")
    .text((d) => d.data.data.id)
})
