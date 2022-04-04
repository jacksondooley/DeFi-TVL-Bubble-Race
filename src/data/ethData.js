const ethData = {
  getEthData: async function(){
    let response = await fetch("https://api.llama.fi/protocols");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const AllProtocolData = await response.json();
    console.log(AllProtocolData);
    
    const protocolHistories = [];
    const ethProtocols = await AllProtocolData.filter( (ele) => {
      if (ele.chains.includes('Ethereum')){
        let obj = {};
        obj.name = ele.name;
        protocolHistories.push(obj);
        return ele;
      }
    });

    for(let i = 0; i < 1; i++){
      let url = "https://api.llama.fi/protocol/" + protocolHistories[i].name.toLowerCase()
      let request = await fetch(url);
      console.log(request);
    }


    console.log(ethProtocols);
    console.log(protocolHistories);
    return ethProtocols;
  }
};

export default ethData;