const DataFetcher = {
  
  getProctocols: async function(){
    const response = await fetch("https://api.llama.fi/protocols");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const protocolData = await response.json();
    console.log(protocolData);
    let dataArr = []
    for (let i = 0; i < 100; i++){
      dataArr.push(protocolData[i]);
    }
    return dataArr;
  }
}

export default DataFetcher;