/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = 40

// LINE GRAPH 1 =========================================
//LOAD DATA
d3.csv('../data/LEPpopulation.csv', d => {
    https: //data.cccnewyork.org/data/map/1256/limited-english-proficiency#1256/210/3/1446/3/a/a
        return {
        year: new Date(+d.Year, 0, 1),
        neighborhood: d.Neighborhood,
        population: +d.Number_of_Limited_English_Proficiency_Individuals
    }
}).then(data => {
    console.log('data :>> ', data);

    //SCALE
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(d => d.year)), d3.max(data.map(d => d.year))])
        .range([margin * 2, width - margin * 2])

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => 0), d3.max(data, d => d.population * 2)])
        .range([height - margin * 2, margin * 2])

    //SVG
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "whitesmoke")

    const line = d3.line()
        .x(d => xScale(d.year) + margin)
        .y(d => yScale(d.population) - margin / 4)

    const groupedData = d3.groups(data, d => d.neighborhood)

    const path = svg.selectAll("path")
        .data(groupedData)
        .join("path")
        .attr("d", ([neighborhood, data]) => line(data))
        .attr("class", ([neighborhood, data]) => neighborhood)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none")

    // AXES INFO
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // AXES LINES
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(40," + (height - margin * 2) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin * 3 + ",0)")
        .call(yAxis)

    // LABELS
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin / 1.25)
        .attr("text-anchor", "middle")
        .style("font-size", "26px")
        .text("Limited English Proficiency Individuals");

    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height - margin / 2) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", margin / 2)
        .style("text-anchor", "middle")
        .text("Population");
});

// LINE GRAPH 2 =========================================
//LOAD DATA
d3.csv('../data/LEPpopulation.csv', d => {
    https: //data.cccnewyork.org/data/map/1256/limited-english-proficiency#1256/210/3/1446/3/a/a
        return {
        year: new Date(+d.Year, 0, 1),
        neighborhood: d.Neighborhood,
        population: +d.Number_of_Limited_English_Proficiency_Individuals
    }
}).then(data => {
    console.log('data :>> ', data);

    //SCALE
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(d => d.year)), d3.max(data.map(d => d.year))])
        .range([margin * 2, width - margin * 2])

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => 0), d3.max(data, d => d.population * 2)])
        .range([height - margin * 2, margin * 2])

    //SVG
    const svg = d3.select("#container2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "whitesmoke")

    const line = d3.line()
        .x(d => xScale(d.year) + margin)
        .y(d => yScale(d.population) - margin / 4)

    const groupedData = d3.groups(data, d => d.neighborhood)

    const path = svg.selectAll("path")
        .data(groupedData)
        .join("path")
        .attr("d", ([neighborhood, data]) => line(data))
        .attr("class", ([neighborhood, data]) => neighborhood)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none")

    // AXES INFO
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // AXES LINES
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(40," + (height - margin * 2) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-30)");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin * 3 + ",0)")
        .call(yAxis)

    // LABELS
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin / 1.25)
        .attr("text-anchor", "middle")
        .style("font-size", "26px")
        .text("Limited English Proficiency Individuals");

    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height - margin / 2) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", margin / 2)
        .style("text-anchor", "middle")
        .text("Population");
});