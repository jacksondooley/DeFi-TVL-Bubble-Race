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

  fillList(){
    fetch(this.protocols_api)
    .then((res) => {
    if (res.ok) {
      console.log("success");
      return res.json();
      }
    })
    .then((data) =>  {
      console.log(data)
      for (let i = 0; i < 10; i++){
        let li = document.createElement("li");
        li.innerText = `${data[i].name}: ${data[i].tvl}`;
        this.list.appendChild(li);
      }
    }
      );
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

export default Fetch;