class Fetch {
  constructor(ele){
    this.ele = ele;
    this.protocols_api = "https://api.llama.fi/protocols";
    this.MakerApi = "https://api.llama.fi/protocol/makerdao";
    this.list = document.getElementById("list");
  }

  fatch(api){
    fetch(api)
    .then((res) => {
    if (res.ok) {
      console.log("success");
      return res.json();
      }
    })
    .then((data) => console.log(data));
  }

  async fillList(){
    return fetch(this.protocols_api)
    .then((res) => {
    if (res.ok) {
      console.log("success");
      return res.json();
      }
    });
    // .then((data) =>  {
    //   const dataArr = []
    //   for (let i = 0; i < 10; i++){
    //     const hash = {}
    //     hash["name"] = data[i].name
    //     hash["tvl"] = Math.floor(data[i].tvl)
    //     dataArr.push(hash)
    //   }
    //   console.log(dataArr)
    //   return dataArr
    // }
  }

  // first 100 tvls for eth
  MKRFillList(){
    fetch(this.MakerApi)
    .then((res) => {
    if (res.ok) {
      console.log("success");
      return res.json();
      }
    })
    .then((data) =>  {
        console.log(data);
        let li = document.createElement("li");
        li.innerText = data.chainTvls.Ethereum.tvl[0].date;
        this.list.appendChild(li);
    });
  }
}

  async function getData(url = this.protocols_api) {
    // We set a default value for the url to our api. This is recommended, but not required.

    // We await our fetch, which will return a promise object
    // Because we're using the await keyword, 
        // we have declared getData with to be an async function
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json() 
    // response.json() parses JSON response into native JavaScript objects
    // response.json() is asynchronous
    return data
}



export default Fetch;