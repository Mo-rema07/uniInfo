$(document).ready(function() {
    let resultsBeg = 1;
    let resultsEnd = resultsBeg+4;

    function listUni(country,destination) {
        let req = $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country="+country,
            type:"get",
            dataType: "json"
        });
        req.done(function(data) {
            let count = 0;
            let list='';
            $.each(data,function(index, entry){
                count++;
                if (count>=resultsBeg && count<=resultsEnd){
                    list+='<a href='+'"'+entry.web_pages[0]+'"'+'><button class='+'"listUniversities"'+' >'+entry.name+'</button></a>'
                }
            });
            $(destination).append(list);
        });

    }

    listUni("lesotho","#lesSummary>ul.first5");
    listUni("mauritius","#mauSummary>ul.first5");
    listUni("united kingdom","#ukSummary>ul.first5");
    loadEnrol();
    loadList();
    visitSite();

});

function loadEnrol(){
    let country;
    $(".btnEnrolStats").click(function () {
        country= $(this).parent().attr('id').toLowerCase();
        indicator=$(this).text().split(" ").join("");
        window.location = "enrolment.html?country="+country+"&indicator="+indicator;
    });

}

function loadList() {
    let country;
    $(".btnSeeAll").click(function () {
        country= $(this).attr('id').substring(4).toLowerCase();
        console.log(country);
        if (country==="uk"){
            country="united kingdom"
        }
        window.location = "list.html?country="+country;
    });

}

function visitSite() {
    let url;
    $(".uni5").click(function () {
        url = $(this).firstChild;
        alert(url);
        }
    )
}
loadEnrol();
loadList();
visitSite();