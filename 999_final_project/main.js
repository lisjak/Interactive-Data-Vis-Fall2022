/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
    height = window.innerHeight * 0.7,
    margin = 40

// LINE GRAPH 1 =========================================
//LOAD DATA
d3.csv('../data/LEPpopulation.csv', d => {
    // https:data.cccnewyork.org/data/map/1256/limited-english-proficiency#1256/210/3/1446/3/a/a
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
        .domain([d3.min(data, d => d.population * 0.5), d3.max(data, d => d.population * 1.25)])
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

    // ANIMATION
    const pathLength = path.node().getTotalLength();

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(5000);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);


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
        .text("Individuals with Limited English Proficiency");

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
d3.csv('../data/nativeUSPopulation.csv', d => {
    //https://data.cccnewyork.org/data/map/1258/citizenship#1258/205/3/1451/62/301/a
    return {
        year: new Date(+d.Year, 0, 1),
        neighborhood: d.Neighborhood,
        population: +d.Number_of_Native_Citizens
    }
}).then(data => {
    console.log('data :>> ', data);

    //SCALE
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(d => d.year)), d3.max(data.map(d => d.year))])
        .range([margin * 2, width - margin * 2])

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.population * 0.75), d3.max(data, d => d.population * 1.25)])
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

    // ANIMATION
    const pathLength = path.node().getTotalLength();

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(5000);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);


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
        .text("Individuals with Native US Citizenship Status");

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
// LINE GRAPH 3 =========================================
//LOAD DATA
d3.csv('../data/medianMonthlyRent.csv', d => {
    //https://data.cccnewyork.org/data/map/67/median-monthly-rent#67/a/3/108/62/301/a
    return {
        year: new Date(+d.Year, 0, 1),
        neighborhood: d.Neighborhood,
        rent: +d.Median_Monthly_Rent
    }
}).then(data => {
    console.log('data :>> ', data);

    //SCALE
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(d => d.year)), d3.max(data.map(d => d.year))])
        .range([margin * 2, width - margin * 2])

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.rent * 0.15), d3.max(data, d => d.rent * 1.15)])
        .range([height - margin * 2, margin * 2])

    //SVG
    const svg = d3.select("#container3")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "whitesmoke")

    const line = d3.line()
        .x(d => xScale(d.year) + margin)
        .y(d => yScale(d.rent) - margin / 4)

    const groupedData = d3.groups(data, d => d.neighborhood)

    const path = svg.selectAll("path")
        .data(groupedData)
        .join("path")
        .attr('class', 'line')
        .attr("d", ([neighborhood, data]) => line(data))
        .attr("class", ([neighborhood, data]) => neighborhood)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none")

    // ANIMATION
    const pathLength = path.node().getTotalLength();

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(5000);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);


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
        .text("Median Monthly Rent");

    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height - margin / 2) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", margin / 2)
        .style("text-anchor", "middle")
        .text("Rent (USD)");

    // BUTTON

    function updatePath() {
        svg.select("path")
            .interrupt()


        svg.selectAll("path")
            .data(groupedData)
            .join("path")
            .attr('class', 'line')
            .attr("d", ([neighborhood, data]) => line(data))
            .attr("class", ([neighborhood, data]) => neighborhood)
            .attr("stroke", "red")
            .attr("stroke-width", "2")
            .attr("fill", "none")
        const pathLength = path.node().getTotalLength();

        const transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(5000);

        path
            .attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength)
            .transition(transitionPath)
            .attr("stroke-dashoffset", 0)

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
    }


    // Update chart when button is clicked
    d3.selectAll(".button3").on("click", () => {
        updatePath();
    });

});


// LINE GRAPH 5 =========================================
//LOAD DATA
d3.csv('../data/incomeUnder15000.csv', d => {
    // https://data.cccnewyork.org/data/map/29/household-income#29/34/3/51/9/301/a
    return {
        year: new Date(+d.Year, 0, 1),
        neighborhood: d.Neighborhood,
        income: +d.Income_Under_15000
    }
}).then(data => {
    console.log('data :>> ', data);

    //SCALE
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(d => d.year)), d3.max(data.map(d => d.year))])
        .range([margin * 2, width - margin * 2])

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.income * 0.15), d3.max(data, d => d.income * 1.15)])
        .range([height - margin * 2, margin * 2])

    //SVG
    const svg = d3.select("#container5")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "whitesmoke")

    const line = d3.line()
        .x(d => xScale(d.year) + margin)
        .y(d => yScale(d.income) - margin / 4)

    const groupedData = d3.groups(data, d => d.neighborhood)

    const path = svg.selectAll("path")
        .data(groupedData)
        .join("path")
        .attr('class', 'line')
        .attr("d", ([neighborhood, data]) => line(data))
        .attr("class", ([neighborhood, data]) => neighborhood)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none")

    // ANIMATION
    const pathLength = path.node().getTotalLength();

    const transitionPath = d3
        .transition()
        .ease(d3.easeSin)
        .duration(5000);

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .attr("stroke-dashoffset", 0);


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
        .text("Individuals with Income over $100,000");

    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height - margin / 2) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", margin / 2)
        .style("text-anchor", "middle")
        .text("Yearly Income (USD)");

    // BUTTON

    function updatePath() {
        svg.select("path")
            .interrupt()

        svg.selectAll("path")
            .data(groupedData)
            .join("path")
            .attr('class', 'line')
            .attr("d", ([neighborhood, data]) => line(data))
            .attr("class", ([neighborhood, data]) => neighborhood)
            .attr("stroke", "red")
            .attr("stroke-width", "2")
            .attr("fill", "none")
        const pathLength = path.node().getTotalLength();

        const transitionPath = d3
            .transition()
            .ease(d3.easeSin)
            .duration(5000);

        path
            .attr("stroke-dashoffset", pathLength)
            .attr("stroke-dasharray", pathLength)
            .transition(transitionPath)
            .attr("stroke-dashoffset", 0)

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
    }


    // Update chart when button is clicked
    d3.selectAll(".button4").on("click", () => {
        updatePath();
    });

});