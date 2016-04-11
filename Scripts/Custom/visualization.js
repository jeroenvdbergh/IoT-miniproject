/**
 * Created by Jeroen on 25/02/2016.
 */

/****/

(function ($) {

    $.fn.drawLineChart = function (data) {

        var ctx = (this)[0].getContext("2d");

        var myLineChart = new Chart(ctx).Line(data, {

            response: true,
            maintainAspectRatio: false

        });

        myLineChart.resize(myLineChart.render, true);
    }
}(jQuery));

$(window).resize(function () {
    $.each(Chart.instances, function (index, value) {
        value.resize(value.render, true);
    });
});

