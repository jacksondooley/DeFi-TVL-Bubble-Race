class Fetch {
  constructor(ele){
    this.ele = ele
    this.protocols_api = "https://api.llama.fi/protocols"
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
}

export default Fetch;