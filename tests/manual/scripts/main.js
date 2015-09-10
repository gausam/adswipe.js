requirejs.config({
    baseUrl: '',
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        adswipe: 'scripts/adswipe.js'+'?bust='+(+new Date()),     // prevent cacheing
        jquery: 'bower_components/jquery/dist/jquery.min'
    }
});

// Start the main app logic.
requirejs(['jquery', 'adswipe'],
function   ($,        adswipe) {

    // enter custom parameters
    adswipe.debug(true);
    adswipe.endpoint('http://api.adswipe.dev.192.168.1.117.xip.io');

    $('.as-init').on('click', function(){
        /* get adswipejs version */
        //console.log(adswipe.version());

        /* get api version */
        // adswipe.apiVersion().then(function(data) {
        //     console.log(data);
        // }, function(error){
        //     console.log(error);
        // });

        /* show ad */
        adswipe.show('O8DcNrpiiLJdlyRtBFtP'); // enter ASID, ie 'O8DcNrpiiLJdlyRtBFtP'
    });
});
