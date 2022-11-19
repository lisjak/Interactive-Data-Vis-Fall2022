/*

 [ ] Implement your own version of the bar chart from the demo branch using the files present in the root of this directory (`2_2_quantities_and_amounts/` [index.html](index.html), [style.css](style.css), [main.js](main.js)), just like we did in the tutorials in section 1. You may use the existing dataset, or a new one.
- [ ] Turn this **vertical bar chart** into a **horizontal bar chart**. This will require adjusting both scales to consider how the data should map back to the svg coordinate plane. (_Tip_: start by getting your bars to show, even if they are not yet positioned/sized correctly -- sometimes it is easier to understand where something should go by seeing where it currently is).

**BONUS:**

- [ ] Add labels to each bar, either by appending `text` to each bar or using [d3-axis](https://github.com/d3/d3-axis) (already included in d3 library).
- [ ] Add a [color scale](https://github.com/d3/d3-scale-chromatic) to your bar chart. This is another type of scale where your range is going to be color values instead of screen dimensions. Feel free to use `ordinal` or `sequential` colorscales (this will depend on what type of field you want to map to color).
- [ ] **Super bonus**: make a horizontal bar chart with divs (still appending them to the page with d3).

*/



/* CONSTANTS AND GLOBALS */
const width = 600;
const height = 600;
const padding = 50;


//VERTICAL==============================================================================

/* LOAD DATA */

d3.csv('../data/squirrelActivities.csv', d3.autoType)
    .then(dataset0 => {
        console.log("data", dataset0)


        const svg = d3.select("#container1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "AntiqueWhite")

        const activities = dataset0.map(d => d.activity)


        /* SCALES */

        const xScale = d3.scaleBand()
            .domain(activities)
            .range([padding * 1.5, width - padding])
            .paddingInner(.4)

        const yScale = d3.scaleLinear()
            .domain(d3.extent(dataset0, d => d.count))
            .range([height - padding * 1.5, padding])
            .nice()

        //for axes info
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);



        /* HTML ELEMENTS */

        //BARS
        svg.selectAll(".bars")
            .data(dataset0)
            .join("rect")
            .attr("class", "bars")
            .attr("x", d => xScale(d.activity))
            .attr("y", d => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.count) - padding * 1.5)
            .attr("fill", "BurlyWood");

        // AXES LINES
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - padding * 1.5) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding * 1.5 + ",0)")
            .call(yAxis);

        // LABELS
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", padding / 1.25)
            .attr("text-anchor", "middle")
            .style("font-size", "26px")
            .text("Squirrel Activities - Vertical");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height - padding / 2) + ")")
            .style("text-anchor", "middle")
            .text("Activity");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", padding / 2)
            .style("text-anchor", "middle")
            .text("Squirrel Count");

    })







//HORIZONTAL==============================================================================

/* LOAD */

d3.csv('../data/squirrelActivities.csv', d3.autoType)
    .then(dataset0 => {
        console.log("data", dataset0)


        const svg = d3.select("#container2")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "AntiqueWhite")

        const activities = dataset0.map(d => d.activity)


        /* SCALES */

        const yScale = d3.scaleBand()
            .domain(activities)
            .range([height - padding * 1.5, padding])
            .paddingInner(.4)

        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataset0, d => d.count))
            //index.html.range([padding, width])
            .range([padding * 2, width - padding])
            .nice()

        //for axes info
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);



        /* HTML ELEMENTS */

        // BARS
        const bars = svg.selectAll(".bars")
            .data(dataset0)
            .join("rect")
            .attr("class", "bars")
            .attr("y", d => yScale(d.activity))
            .attr("x", padding * 2)
            .attr("width", d => width - xScale(d.count) - padding * 1.5)
            .attr("height", yScale.bandwidth())
            .attr("fill", "BurlyWood")


        // AXES LINES
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height - padding * 1.5) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding * 2 + ",0)")
            .call(yAxis);


        // LABELS
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", padding / 1.25)
            .attr("text-anchor", "middle")
            .style("font-size", "26px")
            .text("Squirrel Activities - Horizontal");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height - padding / 2) + ")")
            .style("text-anchor", "middle")
            .text("Squirrel Count");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", padding / 2)
            .style("text-anchor", "middle")
            .text("Activity");
    })