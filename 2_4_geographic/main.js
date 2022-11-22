/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
    height = window.innerHeight * 0.7,
    margin = { top: 20, bottom: 50, left: 60, right: 40 };

//LOAD DATA
Promise.all([
    d3.json("../data/usState.json"),
    d3.csv("../data/stateCapitals.csv", d3.autoType),
    d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([
    geojson,
    capitals,
    usHeatExtremes
]) => {

    // SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //PROJECTION
    const projection = d3.geoAlbersUsa()
        .fitSize([width, height], geojson)

    //PATH
    const pathGen = d3.geoPath(projection)

    //BASE LAYER
    const states = svg.selectAll("path.states")
        .data(geojson.features)
        .join("path")
        .attr("class", "states")
        .attr("d", coords => pathGen(coords))
        .attr("fill", "lightgreen")
        .attr("stroke", "black")


    //COLOR SCALE
    const dataExtent = d3.extent(usHeatExtremes, d => d.Change_in_percent)
    colorScale = d3.scaleDiverging()
        .domain([dataExtent[0], 0, dataExtent[1]])
        .interpolator(d3.interpolateRdBu)


    // HEAT EXTREMES
    const heatCircles = svg.selectAll("circle.heat")
        .data(usHeatExtremes)
        .join("circle")
        .attr("r", 5)
        .attr("class", "heat")
        .attr("fill", d => colorScale(d.Change_in_percent))
        .attr("stroke", "white")
        .attr("transform", d => {
            const [x, y] = projection([d.Long, d.Lat])
            return `translate(${x}, ${y})`
        })


    //CAPITALS
    const capitalCircles = svg.selectAll("circle.capital")
        .data(capitals)
        .join("circle")
        .attr("class", "capital")
        .attr("r", 7)
        .attr("fill", "green")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("transform", (d) => {
            const [x, y] = projection([d.longitude, d.latitude]);
            return `translate(${x}, ${y})`
        })

});