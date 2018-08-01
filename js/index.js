function loadEnrol(){
    var country;
    $(".btnEnrol").click(function () {
        country= $(this).parent().attr('id');
        window.location = "enrolment.html?country="+country+"&indicator=AllProgrammesofStudy";
    });

}
loadEnrol();


function loadList() {
    let country;
    $(".btnUni").click(function () {
        country= $(this).parent().attr('id');
        if (country==="uk"){
            country="united kingdom"
        }
        window.location = "list.html?country="+country;
    });

}

loadList();