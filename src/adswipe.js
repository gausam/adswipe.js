/*jshint esnext: true */
import Config from 'util/config.js';
import Util from 'util/util.js';
import HammerAS from 'util/hammer-as.js';
import Ajax from 'util/ajax.js';

var config = new Config();
var util = new Util(config);
var hammer = new HammerAS(config);

util.checkFingerprint();    // generate unique fingerprint for user
util.findNextZIndex();      // find next z-index for interstitial ads

/**
 * Allow API endpoint url to be returned or updated
 * @return  string or bool  if get (empty arg), return endpoint string; if set, update and return true
 */
export function endpoint(endpoint) {
    if( util.empty(endpoint) ){
        return config.endpoint;
    } else {
       config.endpoint = endpoint; // ie 'http://adswipejs.dev.192.168.1.117.xip.io/';
       return true;
    }
}

/**
 * Allow debug mode to be toggled
 * @return  bool        if get (empty arg), return debug bool; if set, update and return true
 */
export function debug(debug) {
    if( util.empty(debug) ){
        return config.debug;
    } else {
       config.debug = debug;
       return true;
    }
}

/**
 * Return version number
 * @return string       version number
 */
export function version() {
    return config.version;
}

/**
 * Set up and display new ad
 * @param  {int} campaignID     campaign ID hash
 */
export function show(campaignID) {
    if( util.empty(campaignID) ) {
        if( config.debug )
            console.log('Error: no campaign ID found');
        return false;
    }
    return hammer.show(campaignID);
}

/**
 * Reset ad when orientation changed
 */
window.onorientationchange = function() {
    //var orientation = window.orientation;
    hammer.reset();
};
