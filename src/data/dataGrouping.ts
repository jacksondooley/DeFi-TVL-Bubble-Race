import * as d3 from 'd3';

interface RawDataPoint {
  name: string;
  category: string;
  date: string;
  tvlUSD: number;
}

interface Protocol {
  name: string;
  category: string;
  value: number;
}

interface DataSet {
  date: string;
  dataSet: Protocol[];
}

class Data {
  private rawData: RawDataPoint[];
  private names?: Set<string>;
  private datevalues?: Array<[string, d3.InternMap<[string, string], number>]>;

  constructor() {
    this.rawData = require("./data.json");
  }

  getNames(): void {
    this.names = new Set(this.rawData.map(d => d.name));
  }

  groupDates(): void {
    const data = this.rawData;
    const rollupData = d3.rollup(
      data,
      ([d]) => d.tvlUSD,
      d => d.date,
      d => [d.name, d.category] as [string, string]
    );
    
    this.datevalues = Array.from(rollupData)
      .sort(([a], [b]) => d3.ascending(a, b));
  }

  dataSetGroup(): DataSet[] {
    if (!this.datevalues) {
      throw new Error('Must call groupDates() before dataSetGroup()');
    }

    return this.datevalues.map(([date, data]) => {
      const keys = Array.from(data.keys());
      const values = Array.from(data.values());
      
      const protocols: Protocol[] = keys.map((key, i) => ({
        name: key[0],
        category: key[1],
        value: values[i]
      }));

      return {
        date,
        dataSet: protocols
      };
    });
  }
}

export default Data; 