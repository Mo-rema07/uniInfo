function loadEnrol(){
    var indicator, url;
    $(".enrolStats>li>a").click(function () {
        indicator= $(this).attr('class');
        url =$(this).attr('href');
        console.log(indicator);
        console.log(url);
        window.location = url+indicator;
    });

}

loadEnrol();