var adr = function() {
    var _massageArgsJsToNative = function(args) {
        if (!args){
            return args;
        }
        var ret = [];
        args.forEach(function(arg, i) {
           ret.push(Base64.encode(arg)); 
        });
        return ret;
    };
    var _callNativeFunction = function(functionName, args, successCallback, errorCallback) {
        var url = "adrJSBridge://";

        var callInfo = {};
        callInfo.functionname = functionName;

        if (successCallback)
        {
            if (typeof successCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "successCallback", successCallback);
                callInfo.success = callbackFuncName;
            }
            else
                callInfo.success = successCallback;
        }

        if (errorCallback)
        {
            if (typeof errorCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "errorCallback", errorCallback);
                callInfo.error = callbackFuncName;
            }
            else
                callInfo.error = errorCallback;
        }

        if (args)
        {
            callInfo.args = args;
        }

        url += JSON.stringify(callInfo)


        var iFrame = _createIFrame(url);
        //remove the frame now
        iFrame.parentNode.removeChild(iFrame);
    };
    var _callNativeFunctionEncoded = function(functionName, args, successCallback, errorCallback) {
        var url = "adrJSBridge://";

        var callInfo = {};
        callInfo.functionname = functionName;

        if (successCallback)
        {
            if (typeof successCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "successCallback", successCallback);
                callInfo.success = callbackFuncName;
            }
            else
                callInfo.success = successCallback;
        }

        if (errorCallback)
        {
            if (typeof errorCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "errorCallback", errorCallback);
                callInfo.error = callbackFuncName;
            }
            else
                callInfo.error = errorCallback;
        }
        
        callInfo.encoded = true;

        if (args)
        {
            callInfo.args = _massageArgsJsToNative(args);
        }

        url += JSON.stringify(callInfo)


        var iFrame = _createIFrame(url);
        //remove the frame now
        iFrame.parentNode.removeChild(iFrame);
    };
    var _createCallbackFunction = function(funcName, callbackFunc) {
        if (callbackFunc && callbackFunc.name != null && callbackFunc.name.length > 0)
        {
            return callbackFunc.name;
        }

        if (typeof window[funcName+0] != 'function')
        {
            window[funcName+0] = callbackFunc;
            if(typeof __functionIndexMap == 'undefined')
                __functionIndexMap = [];
            __functionIndexMap[funcName] = 0;
            return funcName+0

        } else
        {
            var maxIndex = __functionIndexMap[funcName];
            var callbackFuncStr = callbackFunc.toString();
            for (var i = 0; i <= maxIndex; i++)
            {
                var tmpName = funcName + i;
                if (window[tmpName].toString() == callbackFuncStr)
                    return tmpName;
            }

            var newIndex = ++__functionIndexMap[funcName];
            window[funcName+newIndex] = callbackFunc;
            return funcName+newIndex;
        }
    };
    var _createIFrame = function(src) {
        var rootElm = document.documentElement;
        var newFrameElm = document.createElement("IFRAME");
        newFrameElm.setAttribute("src",src);
        rootElm.appendChild(newFrameElm);
        return newFrameElm;
    };
    var _esc_quote = function(text){
        return text.replace("\"", "\\\"").replace("\'", "\\\'");;
    };
    return {
        sendEmail : function(to, cc, subject, body, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("sendEmail", [to, cc, subject, _esc_quote(body)], successCallback, errorCallback);
            else
                API.sendEmail(to, cc, subject, body, successCallback, errorCallback);
        },
        sendEmailEncoded : function(to, cc, subject, body, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunctionEncoded("sendEmail", [to, cc, subject, _esc_quote(body)], successCallback, errorCallback);
            else
                API.sendEmail(to, cc, subject, body, successCallback, errorCallback);
        },
        sendEmailWithPDFAttachmentFromHTML : function(to, cc, subject, body, attachmentHTML, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunctionEncoded("sendEmailWithPDFAttachmentFromHTML", [to, cc, subject, _esc_quote(body), _esc_quote(attachmentHTML)], successCallback, errorCallback);
            else
                API.sendEmail(to, cc, subject, body, successCallback, errorCallback);
        },
        getItem : function(key, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("getValue", [key], successCallback, errorCallback);
            else
                API.getItem(key, successCallback, errorCallback);
        },
        setItem : function(key, value, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("setValue", [key, value], successCallback, errorCallback);
            else
                API.setItem(key, value, successCallback, errorCallback);
        },
        logEvent : function(object, action, additionalParams, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("logEvent", [object, action, additionalParams], successCallback, errorCallback);
            else
                API.logEvent(object, action, additionalParams, successCallback, errorCallback);
        },
        scanPDF417Barcode : function(successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("scanPDF417Barcode", null, successCallback, errorCallback);
            else
                API.scanPDF417Barcode();
        },
        getCurrentUserName : function(successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("getCurrentUserName", null, successCallback, errorCallback);
            else
                API.getCurrentUserName();
        }
    };
}();


/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
