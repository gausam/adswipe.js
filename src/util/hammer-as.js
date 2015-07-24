/*jshint esnext: true */
import Hammer from 'hammer';
import Ajax from 'util/ajax.js';

class HammerAS {
    constructor(config) {
        this.config = config;

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.el = null;
        this.mc = null;

        this.start_x = 0;
        this.start_y = 0;

        this.ticking = false;
        this.transform = null;
        this.timer = null;

        // add 'adswipe' div node
        var classname = this.config.classElement;
        this.el = document.createElement('div');
        this.el.setAttribute("class", classname);
        document.body.appendChild(this.el);

        // set up hammerjs
        this.mc = new Hammer.Manager(this.el);
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
    show(campaignID) {
        var $ = this;

        // if Adswipe element removed, action has already been taken on this capaign, do not repeat
        if( !$.el )
            return false;

        $.config.campaignID = campaignID;

        $.width = document.documentElement.clientWidth;
        $.height = document.documentElement.clientHeight;

        // get image, append to hammer element
        var image = new Ajax();
        image.url = $.config.endpoint+`campaigns/${campaignID}`;
        image.getImage((response) => {

            $.config.clickURL = response.clickURL;
            $.config.adID = response.adID;
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
                                </ul>`;
                //$.el.innerHTML = $.width+' x '+$.height+'<br>'+$.config.fingerprint;
                $.el.innerHTML = debugData;
                $.el.style.textAlign = 'center';
                $.el.style.color = 'white';
                $.el.style.fontWeight = 'bold';
                $.el.style.textShadow = '0 0 2px black';
            }

            $.el.style.transition = 'all .3s';
            $.el.style.backgroundImage = 'url("'+response.imageURL+'")';
            $.el.style.backgroundSize = 'contain';
            $.el.style.backgroundPosition = 'center center';
            $.el.style.backgroundRepeat = 'no-repeat';
            $.el.style.width = $.width + 'px';
            $.el.style.height = $.height + 'px';
            $.el.style.position = 'fixed';
            $.el.style.top = 0 + 'px';
            $.el.style.zIndex = $.config.zIndex;                    // make sure this is on top of other elements
            $.el.style.backgroundColor = 'rgba(2, 142, 183, 1)';    // just in case the image isn't big enough

            // hammerjs
            $.resetElement();
        });
    }

    resetElement(arg) {
        var $ = this;

        // I want this to swipe off-screen
        var x, y;
        if (arg === 'swipeleft') {
            //$.el.style.background = '#42d692'; // green
            x = -$.el.offsetWidth;
            //updateCount('left');
        } else if (arg === 'swiperight') {
            //$.el.style.background = '#d63349'; // red
            x = ($.start_x + 10) + $.el.offsetWidth;
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
        $.el.style.webkitTransform = value;
        $.el.style.mozTransform = value;
        $.el.style.transform = value;
        $.ticking = false;
    }

    requestElementUpdate() {
        $ = this;
        if (!$.ticking) {
            reqAnimationFrame( $.updateElementTransform.bind(this) );
            $.ticking = true;
        }
    }

    logEvent(str) {
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
        update.url = $.config.endpoint+`campaigns/${$.config.campaignID}`;
        var data = {
            'action': action,
            'cid': $.config.campaignID,
            'impressed_user': $.config.fingerprint,
            'ad_id': $.config.adID
        };
        update.post(data, (response) => {
            // unbind events (must include callback function originally used)
            $.mc.off("swipeleft swiperight", this.onSwipe.bind(this));
            $.mc.off("panleft panright panend", this.onPan.bind(this));
            $.mc.off("tap", this.onTap.bind(this));

            // destroy hammer instance
            this.mc.destroy();

            // destroy element
            $.el.outerHTML = "";
            delete $.el;

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
