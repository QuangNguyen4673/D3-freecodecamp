const dataset = [
  [480, 90],
  [5, 20],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
  [25, 67],
  [85, 21],
  [220, 88],
]
let w = 800
let h = 200
let padding = 50
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h)

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, w - padding])

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([h - padding, padding])

const aScale = d3
  .scaleSqrt()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([2, 8])
svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d[0]))
  .attr("cy", (d) => yScale(d[1]))
  .attr("r", (d) => {
    return aScale(d[1])
  })

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d[0] + "," + d[1])
  .attr("x", (d) => xScale(d[0]))
  .attr("y", (d) => yScale(d[1]))
  .attr("font-size", "20px")
  .style("fill", "red")

const fooScale = d3
  .scaleLinear()
  .domain([0, 500])
  .range([10, 10000])
  .clamp(true)
console.log(fooScale(600))
