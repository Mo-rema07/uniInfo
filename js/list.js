$(document).ready(function() {
    let pageNumber = 1;
    let resultsBeg = 1;
    let resultsEnd = resultsBeg+14;
    let count = 0;
    const url = window.location.href;
    const index = url.indexOf("?");
    let params = url.substring(index + 1).split("&");
    let param = params[0];
    let country = param.substring(param.indexOf("country=")+8);
    let req = $.ajax({
        url: "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country="+country,
        type:"get",
        dataType: "json"
    });
    req.done(function(data) {
        console.log(data);
        let list='';
        $.each(data,function(index, entry){
            console.log(entry);
            count++;
            if (count>=resultsBeg && count<=resultsEnd){
                list+='<button><a href='+entry.web_pages[0]+'>'+entry.name+'</a></button>'
            }
        });
        pageNumber+=1;
        $("#uniList").append(list);
    });

});