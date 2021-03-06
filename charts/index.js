const svg = d3.select("svg")

const width = +svg.attr("width")
const height = +svg.attr("height")

const render = (data) => {
  const xValue = (d) => d.year
  const yValue = (d) => d.population
  const title = "World Population"
  const xAxisLabel = "Year"
  const yAxisLabel = "Population"
  const margin = { top: 50, right: 30, bottom: 80, left: 100 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice()
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(6)
    .tickSize(-innerHeight)
    .tickPadding(20)

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(5)
    .tickFormat((d) => d3.format(".1s")(d).replace("G", "B"))
  const xAxisG = g.append("g").call(xAxis)
  const yAxisG = g.append("g").call(yAxis)
  //x label
  xAxisG
    .append("text")
    .attr("class", "chart-label")
    .attr("y", 60)
    .attr("x", innerWidth / 2)
    .text(xAxisLabel)

  xAxisG
    .attr("transform", `translate(0,${innerHeight})`)
    .select(".domain")
    .remove()

  yAxisG.select(".domain").remove()
  //y label
  yAxisG
    .append("text")
    .attr("class", "chart-label")
    .attr("x", -innerHeight / 2)
    .attr("y", -40)
    .text(yAxisLabel)
    .style("transform", "rotate(-90deg)")
  //Main content
  g.append("path")
    .datum(data)
    .attr("class", "chart-area")
    .attr(
      "d",
      d3
        .area()
        .x((d) => xScale(xValue(d)))
        .y0(innerHeight)
        .y1((d) => yScale(yValue(d)))
        .curve(d3.curveBasis)
    )

  //Title
  svg
    .append("text")
    .attr("class", "chart-title")
    .text(title)
    .attr("y", "35")
    .attr("x", width / 2)
    .attr("text-anchor", "middle")
}

d3.csv(
  "https://vizhub.com/curran/datasets/world-population-by-year-2015.csv"
).then((data) => {
  data.forEach((d) => {
    d.year = new Date(d.year)
    d.population = +d.population
  })
  console.log(data)
  render(data)
})
