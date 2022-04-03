class Bars {
    constructor(){
        this.body = d3.select("body")
        this.sampleData = [2, 4, 8, 4, 16, 32]
        this.sampleObj = [
            { id: 'd1', value: 10, region: 'USA'},
            { id: 'd2', value: 11, region: 'India'},
            { id: 'd3', value: 12, region: 'China'},
            { id: 'd4', value: 6, region: 'Germany'},
        ];
    }
    
    create1() {
        // create empty chart container
        const div = d3.select("#graph")

        //apply styles
        div.style("font", "10px sans-serif");
        div.style("text-align", "right");
        div.style("color", "white");

        //define the initial selection for the bars
        const bar = div.selectAll("div")
        const barUpdate = bar.data(this.sampleData);
        
        const barNew = barUpdate.join("div");

        barNew.style("background", "steelblue");
        barNew.style("padding", "3px");
        barNew.style("margin", "1px");

        barNew.style("width", d => `${d * 10}px`);

        barNew.text(d => d);

        return div.node()

    }

    create2(){
        const data = this.sampleObj
        let width = 420
        let x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width])

        let y = d3.scaleBand()
            .domain(data.map(d => d.region))
            .range([0, 20 * data.length])

        
        const svg = this.body.append("svg")
            .attr("width", width)
            .attr("height", y.range()[1])
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");
      
        const bar = svg.selectAll("g")
          .data(data)
          .enter()
          .append("g")
            .attr("transform", d => `translate(0,${y(d.region)})`);
      
        bar.append("rect")
            .attr("fill", "steelblue")
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth() - 1);
      
        bar.append("text")
            .attr("fill", "white")
            .attr("x", d => x(d.value) - 3)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .text(d => d.value);
    }

}

export default Bars;