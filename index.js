const svg = d3.select("svg")

const width = +svg.attr("width")
const height = +svg.attr("height")

const render = (data) => {
  const xValue = (d) => d.population
  const yValue = (d) => d.country
  const margin = { top: 50, right: 30, bottom: 80, left: 100 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.population)])
    .range([0, innerWidth])
    .nice()
  const yScale = d3
    .scalePoint()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(1)
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

  const xAxisTickFormat = (number) => d3.format(".3s")(number).replace("M", "J")
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight)
  const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth)

  g.append("g").call(yAxis).select(".domain").remove()

  const xAxisG = g.append("g").call(xAxis)
  xAxisG
    .append("text")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text("Population")
    .style("font-size", "1.5rem")

  xAxisG
    .attr("transform", `translate(0,${innerHeight})`)
    .select(".domain")
    .remove()
  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("fill", "black")
    .attr("r", "20")
  g.append("text").text("Top 10 most popular country").attr("y", "-10")
}

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population
  })
  render(data)
})
