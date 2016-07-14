/*jshint esnext: true */
import Hammer from 'hammer';
import Ajax from 'util/ajax.js';
import UAParser from 'uaparser';
import Util from 'util/util.js';

class HammerAS {
    constructor(config) {
        this.config = config;
        this.util = new Util(config);

        this.ad = null;
        this.bg = null;
        this.mc = null;

        this.start_x = 0;
        this.start_y = 0;

        this.ticking = false;
        this.transform = null;
        this.timer = null;

        this.ua = new UAParser();

        this.setup();
    }

    setup(callback) {
        var $ = this;

        // add 'adswipe' div node
        $.ad = document.createElement('div');
        $.ad.setAttribute("class", $.config.classElement);
        document.body.appendChild($.ad);

        // add semi-transparent black bg (will be under ad)
        $.bg = document.createElement('div');
        $.bg.setAttribute("class", $.config.classElement+'_bg');
        document.body.appendChild($.bg);
        $.bg.style.transition = 'all .5s';
        $.bg.style.opacity = 0;

        // add ? to top right corner to explain what AS does
        $.q = document.createElement('div');
        $.q.setAttribute("class", $.config.classElement+'_q');
        document.body.appendChild($.q);

        // add info overlay for users wanting to learn what AS does
        $.info = document.createElement('div');
        $.info.setAttribute("class", $.config.classElement+'_info');
        document.body.appendChild($.info);
        $.info.style.visibility = 'hidden';
        $.info.style.opacity = 0;

        // set up hammerjs
        $.mc = new Hammer.Manager($.ad);
        $.mc.add(new Hammer.Pan());
        $.mc.add(new Hammer.Swipe({
            threshold: 5,
            velocity: 0.2
        })).recognizeWith($.mc.get('pan'));
        $.mc.add(new Hammer.Tap());

        // event listeners
        $.mc.on("swipeleft swiperight", $.onSwipe.bind(this));
        $.mc.on("panleft panright panend", $.onPan.bind(this));
        $.mc.on("tap", $.onTap.bind(this));

        // execute callback, if set
        if( callback ) {
            callback();
        }
    }

    reset() {
        var $ = this;

        if( $.config.isShown ) {
            // remove previous instance
            $.remove(function(){
                // set up new instance
                $.setup(function(){
                    // show updated ad
                    $.show($.config.asid);
                });
            });
        }
    }

    /**
     * Show ad
     * @return {[type]} [description]
     */
    show(asid) {
        var $ = this;

        // if Adswipe element removed, action has already been taken on this capaign, do not repeat
        if( !$.ad )
            return false;

        $.config.asid = asid;
        $.config.isShown = true;

        $.width = document.documentElement.clientWidth;
        $.height = document.documentElement.clientHeight;

        // add semi-transparent background style to bg element
        $.bg.style.width = '100%';
        $.bg.style.height = '100%';
        $.bg.style.position = 'fixed';
        $.bg.style.top = 0 + 'px';
        $.bg.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of other elements, ad will be placed on top of this
        $.bg.style.backgroundColor = 'rgba(0, 0, 0, .85)';
        // fade in $.bg
        $.bg.style.opacity = 1;

        // get image, append to hammer element
        var image = new Ajax();
        image.url = $.config.endpoint+`publications`;
        image.data = {
            'asid': asid,
            'impressed_user': $.config.fingerprint
        };
        image.getImage().then((response) => {
            // everything is good
            $.config.clickURL = response.clickURL;
            $.config.adID = response.adID;
            $.config.campaignID = response.campaignID;

            /** add debug data to div if in debug mode
             * - width x height
             * - User Fingerprint (unique ID)
             *
             * NOTE: no trailing closing tag on LI to prevent inline-block spacing (which dicks everything up)
             */
            if( $.config.debug ) {
                var styleWidth = ( $.width > '800' ) ? '50%' : '90%'; // smaller width on larger display (so not stretched)
                var styleTitle = 'style="width: 30%; display: inline-block;"';
                var styleData = 'style="width: 70%; display: inline-block;"';
                var debugData = `<ul style="width: ${styleWidth}; display: inline-block;">
                                    <li ${styleTitle}>Width x Height
                                    <li ${styleData}>${$.width} x ${$.height}
                                    <li ${styleTitle}>User Fingerprint
                                    <li ${styleData}>${$.config.fingerprint}
                                    <li style="display: inline;">${$.ua.getUA()}
                                </ul>`;
                //$.ad.innerHTML = $.width+' x '+$.height+'<br>'+$.config.fingerprint;
                $.ad.innerHTML = debugData;
                $.ad.style.textAlign = 'center';
                $.ad.style.color = 'white';
                $.ad.style.fontWeight = 'bold';
                $.ad.style.textShadow = '0 0 2px black';
            }

            $.ad.style.transition = 'all .5s';

            if (response.type == 'adNetwork') {
                //Show AdNetwork embed
                response.adNetworkEmbed = '<div>' + response.adNetworkEmbed + '</div>';
                if( $.config.debug ) {
                    $.ad.innerHTML = $.ad.innerHTML + response.adNetworkEmbed;
                } else {
                    $.ad.innerHTML = response.adNetworkEmbed;
                }

            } else {
                //Show Image Ad
                $.ad.style.backgroundImage = 'url("'+response.imageURL+'")';
                $.ad.style.backgroundSize = 'contain';
                $.ad.style.backgroundPosition = 'center center';
                $.ad.style.backgroundRepeat = 'no-repeat';
            }

            $.ad.style.width = $.width + 'px';
            $.ad.style.height = $.height + 'px';
            $.ad.style.position = 'fixed';
            $.ad.style.top = '0px';
            $.ad.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg

            //Run any scripts in the embedded ad (for Ad Network ads)
            if (response.type == 'adNetwork') $.util.executeScripts($.ad);

            $.q.style.transition = 'all .5s';
            $.q.style.color = 'rgb(181, 181, 181)';
            $.q.style.textAlign = 'right';
            $.q.style.height = '50px';
            $.q.style.width = '50px';
            $.q.style.position = 'fixed';
            $.q.style.top = '0px';
            $.q.style.right = '0';
            $.q.style.fontSize = 'large';
            $.q.innerHTML = `<span id="${$.config.classElement}_q" style="cursor: pointer; padding: 5px; background-color: rgba(0, 0, 0, .20);">
                                (?)
                            </span>`;
            $.q.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg, $.ad


            var infoStyle;
            $.info.style.transition = 'all .5s';
            $.info.style.color = 'rgb(181, 181, 181)';
            $.info.style.backgroundColor = 'rgba(0, 0, 0, .85)';
            $.info.style.width = '100%';
            $.info.style.height = '100%';
            $.info.style.position = 'fixed';
            $.info.style.top = '0px';
            $.info.style.fontSize = 'large';
            $.info.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg, $.ad

            if( $.ua.getDevice().type === 'mobile' )
                infoStyle = "width: 90%; margin-left: 5%;";
            else
                infoStyle = "width: 50%; margin-left: 25%;";

            $.info.innerHTML = `<div style="height: ${$.height}px; padding: 10px; overflow-y: auto; ${infoStyle}">
                                    <div style="margin-bottom: 10px; text-align: center; font-size: larger;">
                                        <strong>How Adswipe Works</strong>
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <div style="float: left; margin: 5px 15px 0 0; height: 30px;
                                        padding: 5px 10px 5px 10px; border: 1px solid white; text-align: center;">
                                            Swipe Left
                                        </div>

                                        <p>You understand that ads are inevitable, the trade-off for using cool
                                        software at a reasonable price. By swiping left, you're telling us that you're
                                        kinda into what the ad was about, but aren't sold enough to click it yet. We
                                        want to make sure that if you're going to be advertised to, it may as well be
                                        as useful to you as possible. We'll find something you like!</p>
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <div style="float: right; margin: 5px 0 0 15px; height: 30px;
                                        padding: 5px 10px 5px 10px; border: 1px solid white; text-align: center;">
                                            Swipe Right
                                        </div>

                                        <p style="text-align: right;">You don't resonate with anything about this ad,
                                        and you know what? That's okay! We'll try to find something that does, even if
                                        that means digging through the sofa to find it!</p>
                                    </div>
                                </div>`;

            // onclick event to fade in info overlay
            $.q.addEventListener('click', function() {
                if( $.info.style.visibility === 'hidden' ) {
                    $.info.style.opacity = 1;
                    $.info.style.visibility = 'visible';
                }
            }, false);

            // onclick event to fade out info overlay
            $.info.addEventListener('click', function(){
                if( $.info.style.visibility === 'visible' ) {
                    $.info.style.opacity = 0;
                    $.info.style.visibility = 'hidden';
                }
            }, false);

            // hammerjs
            $.resetElement();
        }, function(error){
            $.logEvent('Error: Unable to get image');
            $.logEvent(error);
            return false;
        });
    }

    resetElement(arg) {
        var $ = this;

        // I want this to swipe off-screen
        var x, y;
        if (arg === 'swipeleft') {
            //$.ad.style.background = '#42d692'; // green
            x = -$.ad.offsetWidth;
            //updateCount('left');
        } else if (arg === 'swiperight') {
            //$.ad.style.background = '#d63349'; // red
            x = ($.start_x + 10) + $.ad.offsetWidth;
        //    updateCount('right');
        } else {
            x = $.start_x;
        }
        $.transform = {
            translate: {
                x: x,
                y: $.start_y
            },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        $.requestElementUpdate();
    }

    updateElementTransform() {
        var $ = this;

        var value = [
            'translate3d(' + $.transform.translate.x + 'px, ' + $.transform.translate.y + 'px, 0)',
            'scale(' + $.transform.scale + ', ' + $.transform.scale + ')'
        ];

        value = value.join(" ");
        $.ad.style.webkitTransform = value;
        $.ad.style.mozTransform = value;
        $.ad.style.transform = value;
        $.ticking = false;
    }

    requestElementUpdate() {
        var $ = this;
        if (!$.ticking) {
            reqAnimationFrame( $.updateElementTransform.bind(this) );
            $.ticking = true;
        }
    }

    logEvent(str) {
        var $ = this;
        if( $.config.debug )
            console.log(str);
    }

    onPan(ev) {
        var $ = this;

        $.transform.translate = {
            x: $.start_x + ev.deltaX,
            y: $.start_y
        };

        // if pan end, snap back if swipe is not called
        if( ev.type === 'panend' ) {
            clearTimeout($.timer);
            $.timer = setTimeout(function() {
                $.resetElement();
            }, 200);
        }

        $.requestElementUpdate();

        $.logEvent(ev.type);
    }

    onSwipe(ev) {
        var $ = this;
        var angle = 50;

        $.transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
        $.transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
        $.transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

        clearTimeout($.timer);
        $.timer = setTimeout(function() {
            $.resetElement(ev.type);
        }, 50);
        $.requestElementUpdate();

        $.logEvent(ev.type);
        $.sendAction(ev.type);
    }

    onTap(ev) {
        var $ = this;

        $.transform.scale = $.config.tapScale;

        clearTimeout($.timer);
        $.timer = setTimeout(function() {
            $.resetElement();
        }, 200);
        $.requestElementUpdate();
        $.logEvent(ev.type);

        // send tap event back to server
        $.sendAction(ev.type);
    }

    sendAction(action) {
        var $ = this;

        // send tap event back to server
        var update = new Ajax();
        update.url = $.config.endpoint+`publications/${$.config.asid}`;
        var data = {
            'action': action,
            'asid': $.config.asid,
            'impressed_user': $.config.fingerprint,
            'ad_id': $.config.adID,
            'campaign_id': $.config.campaignID,
            'browser_name': $.ua.getBrowser().name,
            'browser_version': $.ua.getBrowser().version,
            'device_model': $.ua.getDevice().model,
            'device_type': $.ua.getDevice().type,
            'device_vendor': $.ua.getDevice().vendor,
            'engine_name': $.ua.getEngine().name,
            'engine_version': $.ua.getEngine().version,
            'os_name': $.ua.getOS().name,
            'os_version': $.ua.getOS().version,
            'cpu': $.ua.getCPU().architecture,
            'user_agent': $.ua.getUA()
        };
        update.post(data).then((response) => {

            $.remove(function(){
                if( action === 'tap' )
                    window.open($.config.clickURL);
            });
        });
    }

    remove(callback) {
        var $ = this;

        // destroy hammer instance (events should unbind through garbage collection)
        $.mc.destroy();
        delete $.mc;

        // now fade out $.ad, $.bg, $.q
        // 'delete' should make browser's garbage collection remove any lingering event listeners
        var transitionEnd = $.util.whichTransitionEvent();
        $.ad.addEventListener(transitionEnd, function(){
            $.ad.outerHTML = "";
            delete $.ad;
        }, false);

        $.bg.addEventListener(transitionEnd, function(){
            $.bg.outerHTML = "";
            delete $.bg;
        }, false);

        $.q.addEventListener(transitionEnd, function(){
            $.q.outerHTML = "";
            delete $.q;
        }, false);

        $.ad.style.opacity = 0;
        $.bg.style.opacity = 0;
        $.q.style.opacity = 0;

        // also remove info (it just didn't need to be faded out)
        $.info.outerHTML = "";
        delete $.info;

        // reset config values
        $.config.isShown = false;

        // execute callback, if set
        if( callback && typeof(callback) === "function" ) {
            callback();
        }
    }

}

export default HammerAS;

// self-invoking functions cannot be apart of classes...
var reqAnimationFrame = (function() {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
