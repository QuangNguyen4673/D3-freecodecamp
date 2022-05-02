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
  const xPosition = (d, i) => 60 + i * 120

  const circles = selection.selectAll("circle").data(fruits, (d) => d.id)
  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles)
    .attr("fill", (d) => colorScale(d.type))
    .transition()
    .duration(1000)
    .attr("cx", xPosition)
    .attr("r", (d) => sizeScale(d.type))
  circles.exit().transition().duration(1000).attr("r", 0).remove()

  const text = selection.selectAll("text").data(fruits, (d) => d.id)
  text
    .enter()
    .append("text")
    .attr("x", xPosition)
    .attr("y", height / 2 + 100)
    .attr("text-anchor", "middle")
    .merge(text)
    .transition()
    .duration(1000)
    .attr("x", xPosition)
    .text((d) => d.type)
  text.exit().remove()
}
