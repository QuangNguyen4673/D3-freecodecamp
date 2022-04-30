const svg = d3.select("svg")

const width = +svg.attr("width")
const height = +svg.attr("height")

const render = (data) => {
  const xValue = (d) => d.timestamp
  const yValue = (d) => d.temperature
  const title = "A Week in San Fransisco"
  const xAxisLabel = "Time"
  const yAxisLabel = "Temperature"
  const circleRadius = 6
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
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice()
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

  const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(20)
  const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(5)
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
    .attr("class", "chart-line")
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(d3.curveBasis)
    )

  //Title
  g.append("text").attr("class", "chart-title").text(title).attr("y", "-10")
}

d3.csv(
  "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv"
).then((data) => {
  data.forEach((d) => {
    d.temperature = +d.temperature
    d.timestamp = new Date(d.timestamp)
  })
  render(data)
})
