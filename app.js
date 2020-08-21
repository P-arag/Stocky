let my_data;
let date;
let type;
let global_date;
document.getElementById("smooth").style.display = "none";
document.getElementById("default").style.display = "none";
document.getElementById("line").style.display = "none";

let cat = ["Open", "High", "Low", "Close"];
let url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=VEB5YHX42CW35N01";
function mkchart(date, type = "stepline") {
  global_date = date;
  document.getElementById("chart").innerHTML = "";
  var crt = {
    chart: {
      type: "area",
      height: "200vh",
    },

    series: [
      {
        name: my_data["Meta Data"]["1. Information"],
        data: [
          parseFloat(my_data["Time Series (Daily)"][date]["1. open"]),
          parseFloat(my_data["Time Series (Daily)"][date]["2. high"]),
          parseFloat(my_data["Time Series (Daily)"][date]["3. low"]),
          parseFloat(my_data["Time Series (Daily)"][date]["4. close"]),
        ],
      },
    ],
    xaxis: {
      categories: cat,
    },
    annotations: {
      yaxis: [
        {
          y: 8600,
          y2: 9000,
          borderColor: "#000",
          fillColor: "#FEB019",
          label: {
            text: "Y-axis range",
          },
        },
      ],
    },
    responsive: [
      {
        breakpoint: undefined,
        options: {},
      },
    ],
    stroke: {
      curve: type,
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), crt);
  chart.render();
  document.getElementById("smooth").style.display = "block";
  document.getElementById("line").style.display = "block";
  document.getElementById("default").style.display = "block";
}

async function getData() {
  const response = await fetch(url);
  my_data = await response.json();
  console.log(my_data);
  return my_data;
}

getData();
// // setTimeout(mkchart(), 5000);
document.getElementById("smooth").addEventListener("click", () => {
  type = "smooth";
  document.getElementById("chart").innerHTML = "";
  mkchart(global_date, type);
});
document.getElementById("line").addEventListener("click", () => {
  type = "straight";
  document.getElementById("chart").innerHTML = "";
  mkchart(global_date, type);
});
document.getElementById("default").addEventListener("click", () => {
  type = "stepline";
  document.getElementById("chart").innerHTML = "";
  mkchart(global_date, type);
});
document.getElementById("inpDate").addEventListener("click", () => {
  let k = document.getElementById("inp").value;
  console.log(k);
  mkchart(k);
});
