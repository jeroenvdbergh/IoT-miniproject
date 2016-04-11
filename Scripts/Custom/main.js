/**
 * Created by Jeroen on 25/02/2016.
 */

$(document).ready(function(){

    $(function main() {
        //$("#canvas_id").drawLineChart();
    });

    //var chart = new Chart("temperatuur", ["1", "2"],["25", "36"]);
    //
    ////console.log(chart.dates);
    //
    //var testarray = [5,2,6,1,5,3,56,2,3,0,2,4,234,1,5,53];
    //
    //$.each(testarray, function(index, value){
    //
    //   console.log("index: " + index + " value: " + value);
    //
    //});

   // var pattern = /aa/;

    //console.log(pattern);

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    $("#chart-1").drawLineChart(data);
    $("#chart-2").drawLineChart(data);
    $("#chart-3").drawLineChart(data);
    $("#chart-4").drawLineChart(data);

    updateChart1();


});

function updateChart1(){





        Chart.instances['chart-0'].addData([Math.random() * 100, Math.random() * 100], "hallo")
        Chart.instances['chart-0'].removeData();



}

//function Chart(name, dates, data){
//    this.name = name;
//    this.dates = dates;
//    this.data = data;
//}