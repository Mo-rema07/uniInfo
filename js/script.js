var apiResponse;
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            apiResponse = JSON.parse(xhttp.responseText);
            var data = apiResponse[1];
            // console.log(data);
            var year =[];
            var percentage=[];

            for (var i=0; i<data.length; i++){
                year.push(data[i].date);
                percentage.push(data[i].value);
            }
            var myChart =document.getElementById("myChart").getContext('2d');
            var myVisual = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels:year,
                    datasets: [{
                        label: "%",
                        backgroundColor: "pink",
                        borderColor: "pink",
                        data: percentage,
                    }]
                },

                // Configuration options go here
                options: {
                    // title: {
                    //     display: true,
                    //     text: 'Percentage of students studying Agriculture in Great Britain'
                    // }
                }
            });

        }
    };
    xhttp.open("GET", "http://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F500?date=2009:2015&format=json", true);
    xhttp.send();

}
loadDoc();
console.log(apiResponse);
Chart.defaults.global.defaultFontColor = 'blue';
Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 12;
