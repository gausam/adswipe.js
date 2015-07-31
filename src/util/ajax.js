/*jshint esnext: true */
class Ajax {
    constructor(url, data, async) {
        if(url) this.url = url;
        if(data) this.data = data;
        this.async = (async) ? this.async = async : this.async = true;

        if(window.XMLHttpRequest)
            this.req = new XMLHttpRequest();
        else
            this.req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    get() {
        var $ = this;           // shorthand 'this'
        var req = this.req;
        var method = 'GET';

        return new Promise(function(resolve, reject) {
            if(!$.url)
                reject(Error('No URL Set'));

            if( typeof $.data !== 'undefined' && $.data !== null )
                $.url = $.url+'?'+$.data;

            req.open(method, $.url, $.async);
            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req.onload = function(event) {
                if( this.status == 200 ) {
                    $.response = JSON.parse(this.responseText);
                    resolve($.response);
                } else {
                    reject(Error(this.statusText));
                }
            };

            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            req.send();
        });
    }
    getImage() {
        // NOTE: likely will need to use BinaryJS for video blob streaming - http://binaryjs.com/
        var $ = this;           // shorthand 'this'
        var req = this.req;
        var method = 'GET';

        return new Promise(function(resolve, reject) {
            if(!$.url)
                reject(Error('No URL Set'));

            req.open(method, $.url, $.async);
            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req.onload = function(event) {
                if( this.status == 200 ) {
                    var response = JSON.parse(this.response);
                    var blob = b64toBlob(response.blob, response.type);
                    var urlCreator = window.URL || window.webkitURL;

                    $.response = {
                        blob: blob,
                        imageURL: urlCreator.createObjectURL( blob ),
                        clickURL: response.clickURL,
                        adID: response.adID
                    };

                    resolve($.response);
                } else {
                    reject(Error(this.statusText));
                }
            };

            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            req.send();
        });
    }
    post(data) {
        var $ = this;           // shorthand 'this'
        var req = this.req;
        var method = 'POST';

        return new Promise(function(resolve, reject) {
            if(!$.url)
                reject(Error('No URL Set'));

            req.open(method, $.url, $.async);
            req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req.onload = function(event) {
                if( this.status == 200 ) {
                    $.response = JSON.parse(this.responseText);
                    resolve($.response);
                } else {
                    reject(Error(this.statusText));
                }
            };

            // Handle network errors
            req.onerror = function() {
                reject(Error("Network Error"));
            };

            req.send(JSON.stringify(data));
        });
    }
}

export default Ajax;

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
