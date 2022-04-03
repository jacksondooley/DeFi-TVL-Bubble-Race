class Bars {
    constructor(){
        this.sampleData = [2, 4, 8, 4, 16, 32]
        console.log("w")
        console.log(d3)
    }
    
    create1() {
        // create empty chart container
        const div = d3.select("div")

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
        const container = d3.select("svg")
    }

}

export default Bars;