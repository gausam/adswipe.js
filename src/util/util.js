/*jshint esnext: true */
import Fingerprint2 from 'fingerprint2';

class Util {
    constructor(config) {
        this.config = config;
    }
    /**
     * Shortcut to check if variable is empty or not
     * @param  string       variable to check
     * @return bool         true if empty, false if not
     */
    empty(arg){
        if( typeof arg === 'undefined' || arg === null )
            return true;
        else
            return false;
    }
    /**
     * Generate and store (in config/LocalStorage) unique user fingerprint to track user's swipes/clicks
     * @return n/a
     */
    checkFingerprint() {
        var $ = this;
        if( !$.config.fingerprint ) {
            // if not in local storage, generate fingerprint - else, get from localstorage
            if( !localStorage.as_fingerprint ) {
                new Fingerprint2().get(function(result){
                    $.config.fingerprint = result;
                    localStorage.as_fingerprint = result;
                });
            } else {
                $.config.fingerprint = localStorage.as_fingerprint;
            }
        }
    }
    /**
     * Go through all the elements on the page and find the next highest z-index so adswipe appears on top
     * @return {int}    z-index number to set adswipe to
     */
    findNextZIndex() {
        var $ = this;

        // if no zIndex set in config yet
        // aka, we only want to run all this on ad load so we don't eat up resources, so store in config and then add to that
        // when adding new elements for ad layers (like info popup)
        if( !$.config.zIndex ) {
            var all = document.getElementsByTagName('*');
            var highest = 0;

            for( var i = 0; i < all.length; i++ ) {
                var zi = document.defaultView.getComputedStyle(all[i],null).getPropertyValue("z-index");
                if( (zi > highest) && (zi != 'auto') )
                    highest = zi;
            }

            // cast highest as integer, add one (for next zindex)
            $.config.zIndex = Number(highest)+1;
        } else {
            $.config.zIndex = $.config.zIndex+1;
        }

        return $.config.zIndex;
    }
    /**
     * Figure out which transition event the browser is using
     */
     whichTransitionEvent() {
         var t;
         var el = document.createElement('fakeelement');
         var transitions = {
           'transition':'transitionend',
           'OTransition':'oTransitionEnd',
           'MozTransition':'transitionend',
           'WebkitTransition':'webkitTransitionEnd'
       };

         for(t in transitions) {
             if( el.style[t] !== undefined ){
                 return transitions[t];
             }
         }
     }

    /**
     * Given an element in the DOM, the function will execute the scripts in there (or have them load and run)
     */
    executeScripts(body_el) {
      
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() ===
                  name.toUpperCase();
      };

      function evalScript(elem) {
        var data = (elem.text || elem.textContent || elem.innerHTML || "" ),
            head = document.getElementsByTagName("head")[0] ||
                      document.documentElement,
            script = document.createElement("script");
        
        script.type = "text/javascript";

        //If script has src attribute, add it
        if (elem.src.length > 0) {
            script.src = elem.src;
        } else {
            //other add the script's code
            try {
              // doesn't work on ie...
              script.appendChild(document.createTextNode(data));      
            } catch(e) {
              // IE has funky script nodes
              script.text = data;
            }
        }

        head.insertBefore(script, head.firstChild);
        head.removeChild(script);
      };

      // main section of function
      var scripts = [],
          script,
          children_nodes = body_el.childNodes,
          child,
          i;

      for (i = 0; children_nodes[i]; i++) {
        child = children_nodes[i];
        if (nodeName(child, "script" ) &&
          (!child.type || child.type.toLowerCase() === "text/javascript")) {
              scripts.push(child);
          }
      }

      for (i = 0; scripts[i]; i++) {
        script = scripts[i];
        //if (script.parentNode) {script.parentNode.removeChild(script);}
        evalScript(scripts[i]);
      }
    }
}

export default Util;
