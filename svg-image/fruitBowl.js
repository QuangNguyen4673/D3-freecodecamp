export const fruitBowl = (selection, { fruits }) => {
  const height = +selection.attr("height")
  const colorScale = d3
    .scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["#c11d1d", "yellow"])
  const sizeScale = d3
    .scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["50", "30"])

  const groups = selection.selectAll("g").data(fruits, (d) => d.id)
  const groupEnter = groups.enter().append("g")

  groupEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${60 + i * 120},${height / 2})`)
  groups.exit().remove()

  groupEnter
    .append("circle")
    .merge(groups.select("circle"))
    .attr("fill", (d) => colorScale(d.type))
    .attr("r", (d) => sizeScale(d.type))

  groupEnter
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", 100)
    .merge(groups.select("text"))
    .text((d) => d.type)
}
