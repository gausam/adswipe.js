
<!DOCTYPE html>
<html lang="en" data-rave-meta="bower.json" data-debug>

<head style="min-width: 1024px;">

    <!-- Basic Page Needs
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <meta charset="utf-8">
    <title>Adswipe Manual Testing</title>
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Mobile Specific Metas
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- FONT
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>

    <!-- CSS
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <link rel="stylesheet" href="../bower_components/skeleton/css/normalize.css">
    <link rel="stylesheet" href="../bower_components/skeleton/css/skeleton.css">
    <link rel="stylesheet" href="css/custom.css">

    <!-- Favicon
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
    <!-- <link rel="icon" type="image/png" href="images/favicon.png"> -->

</head>

<body>

    <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->

    <div class="section hero">
        <div class="container">
            <div class="row">
                <div class="one-half column">
                    <h4 class="hero-heading">Launch the init prompt.</h4>
                    <a class="button button-primary as-init" id="as-init">Launch Init</a>
                </div>
                <div class="one-half column phones">
                    <img class="phone" id="phone" src="images/iphone.png">
                </div>
            </div>
        </div>
    </div>

    <div class="section values">
        <div class="container">
            <div class="row">
                <div class="one-third column value">
                    <h2 class="value-multiplier">67%</h2>
                    <h5 class="value-heading">Purchase Increase</h5>
                    <p class="value-description">Percentage of users more likely to purchase on mobile friendly site.</p>
                </div>
                <div class="one-third column value">
                    <h2 class="value-multiplier">90%</h2>
                    <h5 class="value-heading">Multi-device Users</h5>
                    <p class="value-description">Most of the world accesses the internet on multiple devices.</p>
                </div>
                <div class="one-third column value">
                    <h2 class="value-multiplier">66%</h2>
                    <h5 class="value-heading">Sad Users</h5>
                    <p class="value-description">Percentage of users that are frustrated with page load times.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="section get-help">
        <div class="container">
            <h3 class="section-heading">Need help getting started?</h3>
            <p class="section-description">Skeleton is an amazingly easy place to start with responsive development. If you want to learn more, just visit the documentation!</p>
            <a class="button button-primary" href="http://getskeleton.com">View Skeleton Docs</a>
        </div>
    </div>

    <div class="section categories">
        <div class="container">
            <h3 class="section-heading">Responsive Images</h3>
            <p class="section-description">Skeleton images sit easily in grid with .u-max-full-width class. I suggest exploring solution to serving different images based on device size.</p>
            <div class="row">
                <div class="one-half column category">
                    <img class="u-max-full-width" src="images/placeholder.png">
                </div>
                <div class="one-half column category">
                    <img class="u-max-full-width" src="images/placeholder.png">
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts - you can use RequireJS or globals - see below
    –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <!-- Globals
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <!--<script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="scripts/adswipe.js"></script>

        <script>
            $(document).ready(function(){
                adswipe.version();
            });
        </script> -->

        <!-- RequireJS w/ main.js
        –––––––––––––––––––––––––––––––––––––––––––––––––– -->
        <script data-main="scripts/main.js" src="bower_components/requirejs/require.js"></script>


    <!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
</body>

</html>
