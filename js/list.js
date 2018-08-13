$(document).ready(function() {
    let maxPages =1;
    // let pageStart =1;
    let pageNumber = 0;
    let resultsBeg = 1;
    let resultsEnd = resultsBeg+9;
    let pageCount = 1;

    const url = window.location.href;
    const index = url.indexOf("?");
    let params = url.substring(index + 1).split("&");
    let param = params[0];
    let country = param.substring(param.indexOf("country=")+8);

    function loadDoc(country) {
        let count = 0;
        let cou = (country.charAt(0).toUpperCase() + country.substr(1)).replace(/%20/g, " ");
        $('#country').text("List of Universities in "+cou);
        let req = $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country="+country,
            type:"get",
            dataType: "json"
        });
        req.done(function(data) {
            let size = data.length;
            let end = (resultsEnd>=size) ? size : resultsEnd;
            // let pages ='';

            // let pageEnd = (pageCount>=maxPages)? maxPages : pageCount;
            // for (let i=1;i<=pageEnd;i++){
            //     pages+='<li class = "pageNum">'+i+'</li>';
            // }
            // $('.resPageNumbers>ul').append(pages);
            let list='';
            $.each(data,function(index, entry){
                count++;
                if (count>=resultsBeg && count<=resultsEnd){
                    list+='<button class='+'"listUniversities"'+' ><a href='+entry.web_pages[0]+'>'+entry.name+'</a></button>'
                }
            });
            pageCount = Math.ceil(size/10);
            maxPages = Math.ceil(size/10);
            $("#uniList").append(list);
            $('#showing').text('Showing '+resultsBeg+' - '+end+' of '+size+' universities');
        });

    }
    function loadAnother() {
        $(".btnList").click(function () {
            country= $(this).text().toLowerCase();
            $("#uniList").empty();
            loadDoc(country);
            pageNumber=0;
            resultsBeg = 1;
            resultsEnd = resultsBeg+9;
        });
    }

    function loadEnrol(){
        let countryName = country;
        if (countryName === "united kingdom" || countryName === "united%20kingdom"){
            countryName = "uk";
        }
        $(".btnEnrolStats").click(function () {
            indicator=$(this).text().split(" ").join("");
            window.location = "enrolment.html?country="+countryName+"&indicator="+indicator;
        });
    }

    function loadNext(){
        $('#next').click(function () {
            console.log("country "+country+"page :"+pageNumber+" max is "+maxPages+" condition is "+(pageNumber<maxPages-1));
            if (pageNumber<maxPages-1){
                pageNumber+=1;
                resultsBeg+=10;
                resultsEnd+=10;
                // $('.resPageNumbers>ul').empty();
                $("#uniList").empty();
                loadDoc(country);
            }
        });

    }
    function loadPrev(){
        $('#prev').click(function () {
            if (pageNumber>0){
                pageNumber-=1;
                resultsBeg-=10;
                resultsEnd-=10;
                // $('.resPageNumbers>ul').empty();
                $("#uniList").empty();
                loadDoc(country);
            }
        });

    }
    loadDoc(country);
    loadEnrol();
    loadAnother();
    loadPrev();
    loadNext();

});

