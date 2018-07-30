function loadEnrol(){
    var country;
    $(".btnEnrolStats").click(function () {
        country= $(this).parent().attr('id').toLowerCase();
        indicator=$(this).text().split(" ").join();
        window.location = "enrolment.html?country="+country+"&indicator="+indicator;
    });

}
loadEnrol();