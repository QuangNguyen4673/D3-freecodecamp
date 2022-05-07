export const fruitBowl = (
  selection,
  { fruits, selectedFruit, setSelectedFruit }
) => {
  const height = +selection.attr("height")
  const colorScale = d3
    .scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["#c11d1d", "yellow"])
  const sizeScale = d3
    .scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["50", "30"])

  /*   const bowl = selection
    .selectAll("rect")
    .data([null])
    .enter()
    .append("rect")
    .attr("width", 600)
    .attr("height", 250)
    .attr("y", 180)
    .attr("rx", 250 / 2) */

  const groups = selection.selectAll("g").data(fruits, (d) => d.id)
  const groupEnter = groups.enter().append("g")

  groupEnter
    .merge(groups)
    .attr("transform", (d, i) => `translate(${60 + i * 120},${height / 2})`)
  groups.exit().remove()

  groupEnter
    .append("circle")
    .merge(groups.select("circle"))
    .on("mouseover", (e, d) => {
      setSelectedFruit(d.id)
    })
    .on("mouseout", () => setSelectedFruit(null))
    .attr("fill", (d) => colorScale(d.type))
    .attr("r", (d) => sizeScale(d.type))
    .attr("stroke", ({ id }) => (selectedFruit === id ? "black" : "none"))
    .attr("stroke-width", "3")

  groupEnter
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", 100)
    .merge(groups.select("text"))
    .text((d) => d.type)
}
