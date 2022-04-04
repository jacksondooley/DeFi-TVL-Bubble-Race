class barChart {
  constructor(chartId, data, extendedSettings){
    this.data = data;
    this.chartId = chartId;
    this.chartSettings = {
      width: 500,
      height: 400,
      padding: 40,
      titlePadding: 5,
      columnPadding: 0.4,
      ticksInXAxis: 5,
      duration: 3500,

      ...extendedSettings
      
    };

    this.chartSettings.innerWidth = this.chartSettings.width - this.chartSettings.padding * 2;
    this.chartSettings.innerHeight = this.chartSettings.height - this.chartSettings.padding * 2;
  }

  

  


}

export default barChart;