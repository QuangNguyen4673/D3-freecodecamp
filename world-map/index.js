const { json, select, tsv, geoPath, geoNaturalEarth1 } = d3
const { feature } = topojson

const svg = select("svg")

const width = +svg.attr("width")
const height = +svg.attr("height")

const projection = geoNaturalEarth1()
const pathGenerator = geoPath().projection(projection)

svg
  .append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }))

Promise.all([
  tsv("https://unpkg.com/world-atlas@1.1.4/world/110m.tsv"),
  json("https://unpkg.com/world-atlas@1.1.4/world/110m.json"),
]).then(([tsvData, topoJSONdata]) => {
  let countryName = {}
  tsvData.forEach((d) => {
    countryName[d.iso_n3] = d.name
  })
  console.log(countryName)
  const countries = feature(topoJSONdata, topoJSONdata.objects.countries)
  svg
    .selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", (d) => pathGenerator(d))
    .append("title")
    .text((d) => countryName[d.id])
})

json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
  //.text((d) => console.log(d))
})
