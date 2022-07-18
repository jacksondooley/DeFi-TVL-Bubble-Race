import { color } from "d3";
import { transition } from "d3";

class Data{
  constructor(){
    this.rawData = require("./data.json");

  }

  getNames(){
    this.names = new Set(this.rawData.map(d => d.name));
  }

// groups protocols and tvls by date
  groupDates(){
    const grouped = d3.groups(this.rawData, d => d.category);

    let data = this.rawData;
    let datevalues = Array.from(d3.rollup(data, ([d]) => d.tvlUSD, d => d.date, d => [d.name, d.category]))
      .map(([date, data]) => [date, data])
      .sort(([a], [b]) => d3.ascending(a, b));
    this.datevalues = datevalues
  }

  dataSetGroup(){
    const hashArr = []
    for(let i = 0; i < this.datevalues.length; i++){
      let hash = {}
      hash["date"] = this.datevalues[i][0];
      hash["dataSet"] = []
      
      let keys = [...this.datevalues[i][1].keys()]
      let values = [...this.datevalues[i][1].values()]
      for (let i = 0; i < keys.length; i++){
        let protocol = {}
        protocol["name"] = keys[i][0];
        protocol["category"] = keys[i][1]
        protocol["value"] = values[i]
        hash["dataSet"].push(protocol)
      }
      hashArr.push(hash)
    }
    return hashArr
  }


}


export default Data;