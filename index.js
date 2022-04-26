const svg = d3.select("svg");
svg.style("background-color", "gray");
const circle = svg.append("circle");

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = (data) => {
  svg.selectAll("rect");
};
d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population;
  });
  console.log(data);
});
