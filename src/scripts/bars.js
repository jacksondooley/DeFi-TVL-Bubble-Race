

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
    createSample(){
        const data = this.sampleObj
        console.log(data)
        const width = 420
        const height = 500
        const margin = ({top: 20, right: 0, bottom: 30, left: 40})

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width])

        const y = d3.scaleBand()
            .domain(data.map(d => d.region))
            .range([0, 20 * data.length])

        
        const svg = this.body.append("svg")
            .attr("viewBox", [-10, -20, width + 50, height])
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");

        const bar = svg.selectAll("g")
          .data(data)
          .enter()
          .append("g")
            .attr("transform", d => `translate(0,${y(d.region)})`)

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

        const g = svg.append("g")
            .attr("transform", `translate(0,${0})`)
            .call(d3.axisTop(x))
            
        
    }

    createReal(data){
        console.log(data);
        const width = 420
        const height = 500
        const margin = ({top: 20, right: 0, bottom: 30, left: 40})
        const x = d3.scaleLinear()        
            .domain([0, d3.max(data, d => d.tvl)])
            .range([0, width]);


        const y = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, 20 * data.length])

        
        const svg = this.body.append("svg")
            .attr("viewBox", [-10, -20, width + 50, height])
            .attr("font-family", "sans-serif")
            .attr("font-size", "10")
            .attr("text-anchor", "end");


        const bar = svg.selectAll("g")
          .data(data)
          .enter()
          .append("g")
            .attr("transform", d => `translate(0,${y(d.name)})`)

        bar.append("rect")
            .attr("fill", d => this.categoryColor(d.category))
            .attr("fill-opacity", 0.6)
            .attr("width", d => x(d.tvl))
            .attr("height", y.bandwidth() - 1);
      
        bar.append("text")
            .attr("fill", "black")
            .attr("x", d => x(d.tvl) - 3)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .text(d => d.name);

        const g = svg.append("g")
            .attr("transform", `translate(0,${0})`)
            .call(d3.axisTop(x))
            
        
    }

    //Pick color for bar based on protocol category
    categoryColor(category){
        if (category === "Dexes") {
            return "#4e79a7";
        }
        else if (category === "Lending") {
            return "#59a14f";
        }
        else if (category === "Bridge") {
            return "#af7aa1";
        }
        else if (category === "Liquid Staking") {
            return "#586EFC"; //Purple / Blue
        }
        else if (category === "Yield") {
            return "#2CFF53"; //Green
        }
        else if (category === "CDP") {
            return "#B645E6"; //Purple
        }
        else if (category === "Algo-Stables") {
            return "#FE4C4C"; //Red
        }
        else if (category === "Yield Aggregator") {
            return "#45DDE6"; //light blue
        }
        else {
            return "brown";
        }
    };

}

export default Bars;