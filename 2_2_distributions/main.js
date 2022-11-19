/* CONSTANTS AND GLOBALS */
const width = 800,
    height = 800,
    padding = 40,
    radius = 5;


const infoWords = ''

/* LOAD DATA */
d3.csv('../data/statePopulations.csv', d3.autoType)
    .then(dataset0 => {
        // console.log("data", dataset0)


        const svg = d3.select("#container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "HoneyDew")

        const div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const state = dataset0.map(d => d.State)
        const voter = dataset0.map(d => d.Voting_Age_Citizens)
        const house = dataset0.map(d => d.Total_Housing_Units)
        const homeless = dataset0.map(d => d.Total_Homeless)

        // const voteHouse = d.Total_Housing_Units / d.Voting_Age_Citizens


        // console.log('1')
        // console.log("state", state)
        // console.log("voters", voter)
        // console.log("house", house)

        // SCALES
        const xScale = d3.scaleSqrt()
            .domain([d3.min(dataset0.map(d => d.Total_Housing_Units)), d3.max(dataset0.map(d => d.Total_Housing_Units))])
            .range([padding * 2, width - padding * 2])

        const yScale = d3.scaleSqrt()
            .domain([d3.min(dataset0, d => d.Voting_Age_Citizens), d3.max(dataset0, d => d.Voting_Age_Citizens)])
            .range([height - padding * 2, padding * 2])

        const rScale = d3.scaleSqrt()
            .domain([0, Math.max(...dataset0.map(d => d.Voting_Age_Citizens / d.Total_Homeless))])
            .range([0, 0.25])

        const colorScale = d3.scaleSqrt()
            .domain([0, 50000])
            .range(["green", "red"]);

        // AXES INFO
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);


        // AXES LINES
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(40," + (height - padding * 2) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding * 3 + ",0)")
            .call(yAxis);

        // LABELS
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", padding / 1.25)
            .attr("text-anchor", "middle")
            .style("font-size", "26px")
            .text("Total Housing Units vs Voting Age Pop. vs. Homeless Pop. by State");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height - padding / 2) + ")")
            .style("text-anchor", "middle")
            .text("Voting Age Population");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", padding / 2)
            .style("text-anchor", "middle")
            .text("Housing Units");

        // DOTS
        const dot = svg
            .selectAll("circle")
            .data(dataset0)
            .join(
                enter => enter
                .append("circle")
                .attr("r", 0)
                .call(sel => sel.transition()
                    .duration(10000)
                    .attr("r", d => rScale(d.Total_Housing_Units))),
                update => update,
                exit => exit,
            )
            // .data(dataset0, d => d.State)
            .attr("class", "dot")
            .attr("cx", d => xScale(d.Voting_Age_Citizens) + padding)
            .attr("cy", d => yScale(d.Total_Housing_Units) - padding)
            .attr("r", d => rScale(d.Total_Housing_Units))
            .attr("fill", d => colorScale(d.Total_Homeless))
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            // .attr("fill", "#FFFFFF")
            .on('mouseover', function(d, i) {
                // console.log("selectedDot", selectedDot)
                const x = d.pageX
                    // console.log('x', x)
                const y = d.pageY
                    // console.log("d1", d)
                d3.select(this).transition()
                    .duration('100')
                    // .attr("r", radius * 1.25);
                    .attr("stroke", "black")
                    .attr("stroke-width", 5)
                div.transition()
                    .duration(100)
                    .style("opacity", 1)
                    // d3.select("#info")
                    //     .append('div')
                    // .html("<b>You are hovering over:</b> " + (this.state) + "<br> <b>Total Housing Units:</b>" + (house) + "<br> <b>Voting Age Citizens:</b> " + (voter))
                div.html("<b>You are hovering over:</b> " + (state[0]) + "<br> <b>Total Housing Units:</b>" + (house[0]) + "<br> <b>Voting Age Citizens:</b> " + (voter[0]) + "<br> <b>Total Homeless:</b> " + (homeless[0]))
                    .style("left", (x) + "px")
                    // console.log('x2', x)
                    // console.log("this", this)
                    // console.log("d", d)
                    .style("top", (y) + "px")
            })
            .on('mouseout', function(d, i) {
                d3.select(this).transition()
                    .duration('200')
                    .attr("stroke", "white")
                    .attr("stroke-width", 3)
                div.transition()
                    .duration('200')
                    .style("opacity", 0)



            });




    })