const country_codes = {
    "lesotho": "LSO",
    "mauritius": "MUS",
    "uk":"GBR"
};
indicators =[{id: "AllProgrammesofStudy",code:"SE.TER.ENRR", text:"All Programmes of Study"},
    {id:"Agriculture", code: "UIS.FOSEP.56.F600", text:"Agriculture"},
    {id:"Education",code:"UIS.FOSEP.56.F140",text:"Education"},
    {id:"Engineering,ManufacturingandConstruction",text:"Engineering, Manufacturing and Construction",code:"UIS.FOSEP.56.F500"},
    {id:"HealthandWelfare",text:"Health and Welfare",code:"UIS.FOSEP.56.F700"},
    {id:"HumanitiesandArts",text:"Humanities and Arts",code:"UIS.FOSEP.56.F200"},
    {id:"UnspecifiedFields",text:"Unspecified Fields",code:"UIS.FOSEP.56.FUK"},
    {id:"Science",text:"Science",code:"UIS.FOSEP.56.F400"},
    {id:"Services",text:"Services",code:"UIS.FOSEP.56.F800"},
    {id:"SocialSciences,BusinessandLaw",text:"Social Sciences, Business and Law",code:"UIS.FOSEP.56.F300"}]
;
const url = window.location.href;
const index = url.indexOf("?");
let params = url.substring(index + 1).split("&");
let param = params[0];
let country = param.substring(param.indexOf("country=")+8);
const code = country_codes[country];
param=params[1];
country = param.substring(param.indexOf("indicator=")+10);
let indicator;
for (let i=indicators.length-1; i>-1; i--){
    if(country===indicators[i].id){
        indicator = indicators[i].code;
    }
}

let apiResponse;

function loadEnrol(){
    var country;
    $(".btnEnrol").click(function () {
        country= $(this).parent().attr('id');
        console.log(country);
        window.location = "enrolment.html?country="+country+"&indicator=AllProgrammesofStudy";
    });

}

loadEnrol();

function nextChart() {

}



$(document).ready(function(){
    function loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                apiResponse = JSON.parse(xhttp.responseText);
                var data = apiResponse[1];
                console.log(data);
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
                            backgroundColor: '#0075C2',
                            borderColor: "#0075C2",
                            data: percentage,
                        }]
                    },

                    // Configuration options go here
                    options: {
                        title: {
                            display: true,
                            text: data[0].indicator.value
                        }
                    }
                });

            }
        };
        xhttp.open("GET", "http://api.worldbank.org/v2/countries/"+code+"/indicators/"+indicator+"?date=2009:2015&format=json", true);
        xhttp.send();

    }
    loadDoc();
    // loadData(code, indicator);
    Chart.defaults.global.defaultFontColor = '#555';
    Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    Chart.defaults.global.defaultFontSize = 16;
});

