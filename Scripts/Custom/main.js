/**
 * Created by Jeroen on 25/02/2016.
 */


// Normaal moet de delay op minsten 10000 staan aangezien de database om de 10 seconde geupdate wordt.
var speed = 10000;
var numberOfValues;
var average;
var allData = [];
var lastValue;

//Alle gebruikswaardes bij elkaar opgeteld. Deze variable wordt gebruikt voor het berekenen van het gemiddeld gebruik.
var sum = 0;


$(document).ready(function () {
    $("#huiskamer").attr("src","/Images/lightbulb-on.png");
    //
    $("#dialog").dialog();

    //Datum van vandaag
    var date = new Date();

    //substract 1 month van de datum af. Vanaf deze datum gaan we het gemiddelde verbruik berekenen.
    date.setDate(date.getDate() - 30);

    date = $.datepicker.formatDate('yy-mm-dd', date);

    var labels = [];
    var values = [];

    $.ajax({

        url: 'http://192.168.1.34:27017/allValues',
        type: 'GET',
        dataType: "json",
        crossDomain: true,
        success: function (data) {

            allData = JSON.parse(data);

            $.each(allData, function (index, value) {

                //Hier staat alle code om de format van het data array aan te passen zodat het te gebruiken is in de grafieken
                //Nergens op andere plekken in de code dit doen!
                value.huidigverbruik = value.huidigverbruik.slice(10, 17);

                if (value.datum > date) {
                    sum = sum + parseFloat(value.huidigverbruik);
                }

            });
            //afronden
            average = Math.round(sum / allData.length * 1000)/1000;

        }
    }).done(function () {

        init();

        var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        var time = yesterday.getHours() + ":" + yesterday.getMinutes() + ":" + yesterday.getSeconds();
        var date24HoursAgo = yesterday.getFullYear() + "-" + ("0" + (yesterday.getMonth() + 1)).slice(-2) + "-" + ("0" + yesterday.getDate()).slice(-2);

        drawChartByDate("#chart-1", date24HoursAgo, "time");
        drawChartByDate("#chart-2", date, "date");
    });

    //getLastValue();
    setInterval(function () {
        //getLastValue();
    }, speed);
});

function drawChartByDate(container, date, xAxis) {

    var datum = [];
    var tijd = [];
    var verbruik = [];

    $.each(allData, function (index, value) {

        if (value.datum >= date) {
            datum.push(value.datum);
            tijd.push(value.tijd);
            verbruik.push(parseFloat(value.huidigverbruik));
        }
    });

   switch (xAxis){
       case "time":
           $(container).drawLineChart(tijd, verbruik);
           break;

       case "date":
           $(container).drawLineChart(datum, verbruik);
           break;
   }

}

function init() {
    $('#energy-meter-huidig').drawGaugeChart('huidig', 0);
    $('#energy-meter-gemiddeld').drawGaugeChart('gemiddeld', average);

    angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache']).controller('AppCtrl', function($scope) {
        $scope.myDate = new Date();

        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());

        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }
    });


    //initialiseer de jQuery dialog
    $("#dialog").dialog();
}

function getLastValue() {

    $.ajax({

        url: 'http://192.168.1.34:27017/newValue',
        type: 'GET',
        dataType: "json",
        crossDomain: true,
        success: function (data) {

            console.log(data);

            //Check of data geen null is, als data wel null is, is er geen nieuwe data gevonden
            if (data != "null") {

                    if (lastValue != data) {
                        lastValue = data;
                    }

                    data = JSON.parse(data);

                    allData.push(data);
                    //Hier staat de code om de data in de JSON array te bewerken zodat het gebruikt kan worden in de grafieken
                    data.huidigverbruik = data.huidigverbruik.slice(10, 17);


                    //Zoek de huidig gebruik Gauge chart
                    var huidigChart = getChartReferenceByClassName('huidig');
                    //Update de waarde van de Gauge chart met de nieuwe gevonden waarde

                    var temp = parseFloat(data.huidigverbruik);
                    huidigChart.series[0].points[0].update(Math.round(temp*1000)/1000, 10);

                    //average = sum / allData.length;
                    //
                    //var gemiddeldChart = getChartReferenceByClassName('gemiddeld');
                    //gemiddeldChart.series[0].points[0].update(parseFloat(average, 10));
                } else {
                    $("#dialog").dialog("open");
                }
            }
    });
}


function updateValues() {

    //var huidigChart = getChartReferenceByClassName('huidig');
    //var gemiddeldChart = getChartReferenceByClassName('gemiddeld');

    //huidigChart.series[0].points[0].update(Math.random() * 100);
    //gemiddeldChart.series[0].points[0].update(Math.random() * 100);

    //Update Energie verbruik afgelopen 24 uur chart.
    //Voeg nieuwe waarde toe en verwijder laatste waarde
    Chart.instances['chart-0'].addData([Math.random() * 100], "hallo");
    Chart.instances['chart-0'].removeData();

    //Update Energie verbruik afgelopen maand door nieuwe waardes toe te voegen.
    Chart.instances['chart-1'].addData([Math.random() * 100], "hallo")
    Chart.instances['chart-1'].removeData();


}

function getChartReferenceByClassName(className) {

    var foundChart = $('.' + className + '').eq(0).parent().highcharts();

    return foundChart;
}
