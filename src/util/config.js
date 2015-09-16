/*jshint esnext: true */
class Config {
    constructor() {
        this._version = '0.1.3';
        this._endpoint = 'http://adswipe.com/';
        this._debug = false;
        this._fingerprint = null;
        this._classElement = '_adswipe_'+(Math.random()*1e32).toString(36);
        this._tapScale = '.95';
        this._zIndex = null;
        this._asid = null;
        this._clickURL = null;
        this._adID = null;
        this._campaignID = null;
    }

    get version() { return this._version; }

    get endpoint() { return this._endpoint; }
    set endpoint(url) { this._endpoint = (url.slice(-1) !== '/' ? url+'/' : url); return this._endpoint; }

    get debug() { return this._debug; }
    set debug(debug) { this._debug = debug; }

    get classElement() { return this._classElement; }

    get tapScale() { return this._tapScale; }

    get zIndex() { return this._zIndex; }
    set zIndex(zIndex) { this._zIndex = zIndex; }

    get asid() { return this._asid; }
    set asid(asid) { this._asid = asid; }

    get clickURL() { return this._clickURL; }
    set clickURL(clickURL) { this._clickURL = clickURL; }

    get adID() { return this._adID; }
    set adID(adID) { this._adID = adID; }

    get campaignID() { return this._campaignID; }
    set campaignID(campaignID) { this._campaignID = campaignID; }
}

export default Config;
