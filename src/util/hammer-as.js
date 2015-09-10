/*jshint esnext: true */
import Hammer from 'hammer';
import Ajax from 'util/ajax.js';
import UAParser from 'uaparser';
import Util from 'util/util.js';

class HammerAS {
    constructor(config) {
        this.config = config;
        this.util = new Util(config);

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.ad = null;
        this.bg = null;
        this.mc = null;

        this.start_x = 0;
        this.start_y = 0;

        this.ticking = false;
        this.transform = null;
        this.timer = null;

        this.ua = new UAParser();

        // add 'adswipe' div node
        this.ad = document.createElement('div');
        this.ad.setAttribute("class", this.config.classElement);
        document.body.appendChild(this.ad);

        // add semi-transparent black bg (will be under ad)
        this.bg = document.createElement('div');
        this.bg.setAttribute("class", this.config.classElement+'_bg');
        document.body.appendChild(this.bg);

        // set up hammerjs
        this.mc = new Hammer.Manager(this.ad);
        this.mc.add(new Hammer.Pan());
        this.mc.add(new Hammer.Swipe({
            threshold: 5,
            velocity: 0.2
        })).recognizeWith(this.mc.get('pan'));
        this.mc.add(new Hammer.Tap());

        // event listeners
        this.mc.on("swipeleft swiperight", this.onSwipe.bind(this));
        this.mc.on("panleft panright panend", this.onPan.bind(this));
        this.mc.on("tap", this.onTap.bind(this));
    }

    reset() {
        this.show();
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

        $.width = document.documentElement.clientWidth;
        $.height = document.documentElement.clientHeight;

        // add semi-transparent background style to bg element
        $.bg.style.transition = 'all .3s';
        $.bg.style.width = $.width + 'px';
        $.bg.style.height = $.height + 'px';
        $.bg.style.position = 'fixed';
        $.bg.style.top = 0 + 'px';
        $.bg.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of other elements, ad will be placed on top of this
        $.bg.style.backgroundColor = 'rgba(0, 0, 0, .85)';

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

            $.ad.style.transition = 'all .3s';
            $.ad.style.backgroundImage = 'url("'+response.imageURL+'")';
            $.ad.style.backgroundSize = 'contain';
            $.ad.style.backgroundPosition = 'center center';
            $.ad.style.backgroundRepeat = 'no-repeat';
            $.ad.style.width = $.width + 'px';
            $.ad.style.height = $.height + 'px';
            $.ad.style.position = 'fixed';
            $.ad.style.top = 0 + 'px';
            $.ad.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of other elements

            // add question mark to ad
            var q = document.createElement('div');
            q.setAttribute("class", $.config.classElement+'_q');
            $.ad.appendChild(q);

            q.style.transition = 'all .3s';
            q.style.width = $.width + 'px';
            q.style.height = $.height + 'px';
            q.style.position = 'fixed';
            q.style.top = 0 + 'px';
            q.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of other elements
            q.innerHTML = "<span>?</span>";

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
            // unbind events (must include callback function originally used)
            $.mc.off("swipeleft swiperight", $.onSwipe.bind(this));
            $.mc.off("panleft panright panend", $.onPan.bind(this));
            $.mc.off("tap", $.onTap.bind(this));

            // destroy hammer instance
            $.mc.destroy();

            // destroy element
            $.ad.outerHTML = "";
            $.bg.outerHTML = "";
            delete $.ad;
            delete $.bg;

            if( action === 'tap' )
                window.open($.config.clickURL);
        });
    }


}

export default HammerAS;

// self-invoking functions cannot be apart of classes...
var reqAnimationFrame = (function() {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
