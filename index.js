const svg = d3.select("svg");

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = { top: 50, right: 20, bottom: 80, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.population)])
    .range([0, innerWidth]);
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .paddingInner(0.05);
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAxisTickFormat = (number) =>
    d3.format(".3s")(number).replace("M", "J");
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);
  const yAxis = d3.axisLeft(yScale);
  g.append("g").call(yAxis).selectAll(".domain, .tick line").remove();

  const xAxisG = g.append("g").call(xAxis);
  xAxisG
    .append("text")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text("Population")
    .style("font-size", "1.5rem");

  xAxisG
    .attr("transform", `translate(0,${innerHeight})`)
    .select(".domain")
    .remove();
  g.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .attr("y", (d) => yScale(yValue(d)));
  g.append("text").text("Top 10 most popular country").attr("y", "-10");
};

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population;
  });
  render(data);
});
