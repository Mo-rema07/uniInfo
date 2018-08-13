Chart.defaults.global.defaultFontColor = '#555';
Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 16;
Chart.scaleService.updateScaleDefaults('bar', {
    ticks: {
        min: 0
    }
});
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
let length = indicators.length;
let indIndex =0;
const url = window.location.href;
const index = url.indexOf("?");
let params = url.substring(index + 1).split("&");
let param = params[0];
let country = param.substring(param.indexOf("country=")+8);
let code = country_codes[country];

param=params[1];
country = param.substring(param.indexOf("indicator=")+10);
let indicator;
indicator = findIndicator(country);
let apiResponse;
function loadDoc(code,indicator) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            apiResponse = JSON.parse(xhttp.responseText);
            var data = apiResponse[1];
            var year =[];
            var percentage=[];
            for (var i=data.length-1; i>-1; i--){
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
                    maintainAspectRatio : false,
                    title: {
                        display: true,
                        text: data[0].indicator.value
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0
                            }
                        }]
                    }
                }
            });

        }
    };
    xhttp.open("GET", "http://api.worldbank.org/v2/countries/"+code+"/indicators/"+indicator+"?date=2009:2015&format=json", true);
    xhttp.send();

}
loadDoc(code,indicator);
// loadData(code, indicator);

function loadNext(){
    $("#enrolNext").click(function () {
        if (indIndex < length-1) {
            indIndex += 1;
            indicator = indicators[indIndex].code;
            loadDoc(code, indicator);
        }
    });
}
loadNext();

function loadPrev(){
    $("#enrolPrev").click(function () {
        if (indIndex > 0) {
            indIndex -= 1;
            indicator = indicators[indIndex].code;
            loadDoc(code, indicator);
        }
    });
}
loadPrev();

function changeCountry(){
    $('select').change(function (){
        country= this.value;
        code = country_codes[country];
        loadDoc(code,indicator);
    })
}

changeCountry();
function findIndicator(title){
    for (let i=length-1; i>-1; i--){
        if(title===indicators[i].id){
            indicator = indicators[i].code;
            indIndex=i;
        }

    }
    return indicator;
}

function loadDirect() {
    $(".btnEnrolStats").click(function () {
        indicator=$(this).text().split(" ").join("");
        indicator=findIndicator(indicator);
        loadDoc(code,indicator);
    });
}

loadDirect();

function loadList() {
    let country;
    $(".btnList").click(function () {
        country= $(this).text().toLowerCase();
        console.log(country);
        window.location = "list.html?country="+country;
    });

}

loadList();