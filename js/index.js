function loadEnrol(){
    var country;
    $(".btnEnrol").click(function () {
        country= $(this).parent().attr('id');
        window.location = "enrolment.html?country="+country+"&indicator=AllProgrammesofStudy";
    });

}
loadEnrol();
