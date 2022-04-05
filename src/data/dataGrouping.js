class Data{
  constructor(){
    this.rawData = require("./data.json");
  }

  testLogger(){
    console.log("in data grouping");
    console.log(this.rawData);
  }

  // datesArr(){
  //   const maker = this.rawData[2];
  //   const dates = maker.ethTvlHistory.map(m => m.date);
  //   this.dates = dates;
  //   console.log(this.dates);
  // }
  getNames(){
    this.names = new Set(this.rawData.map(d => d.name));
    console.log(this.names);
  }

  groupDates(){
    const grouped = d3.group(this.rawData, d => d.name);
    console.log(grouped);
    let data = this.rawData;
    let datevalues = Array.from(d3.rollup(data, ([d]) => d.tvlUSD, d => d.date, d => d.name))
      .map(([date, data]) => [date, data])
      .sort(([a], [b]) => d3.ascending(a, b));

    console.log(datevalues)
    this.datevalues = datevalues
  }

  rank(value) {
    const data = Array.from(this.names, name => ({name, value: value(name)}));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
  }
}


export default Data;