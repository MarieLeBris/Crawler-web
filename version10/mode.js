var mode = "";
$(document).ready(function(){
    $('#desktop-other').hide();
    $('#mobile-portrait').hide();
    $('#mobile-lanscape').hide();

    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
        $('#desktop-other').hide(),
        $('#mobile-portrait').show(),
        $('#mobile-landscape').hide(),



        $(window).on("orientationchange",function( event ){
            var orientation = screen.orientation.type;
            if(orientation == "landscape-primary")
                $('#desktop-other').hide(),
                $('#mobile-portrait').hide(),
                $('#mobile-landscape').show(),
                mode = 'mobile-landscape';
            else
                $('#desktop-other').hide(),
                $('#mobile-portrait').show(),
                $('#mobile-landscape').hide(),
                mode = 'mobil-portrait';
    });

    else 
        $('#mobile-portrait').hide(),
        $('#mobile-landscape').hide(),
        $('#desktop-other').show(),
        mode = 'desktop';
        console.log(mode)



}
);