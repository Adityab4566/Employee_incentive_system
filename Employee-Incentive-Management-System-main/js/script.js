
var sidebarOpen = false;
var sidebar=document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// ---------------- CHARTS -----------------

// BAR CHART

var barChartOptions = {
    series: [
        {
    data: [11000,23000,45000,12000,3000,2000,55000,12000,65000,24000],
  },
],
    chart: {
    type: 'bar',
    height: 350,
    toolbar:{
        Show: false,
    },
  },
  colors: [
  '#246dec',
  '#cc3c43',
  '#367952',
  '#f5b74f',
  '#4f35a1'
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%'
    },
  },
  dataLabels: {
    enabled: false,
  },

  legend:{
    show: false,
  },
  xaxis: {
    title: {
        text: 'EMPLOYEES',
    },
    categories: ['101','102','103','104','105','106','107','108','109','110'],
  },
  yaxis: {
    title:{
        text: 'SALES',
    },
  }
  };

  var barChart = new ApexCharts(document.querySelector('#bar-chart'), barChartOptions);
  barChart.render();

  // ----------------PIE CHART ---------------------------


  var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Package 1', 'Package 2', 'Package 3', 'Package 4', 'Package 5'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#pie-chart"), options);
  chart.render();
