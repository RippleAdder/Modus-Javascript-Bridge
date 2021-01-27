/* eslint-disable */
var Modus = (function () {
    //Variables
    let _fallback;
    let _areExamplesEnabled = _getParameterByName("example") !== null;

    //Helpers
    function _getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    //Break this in to a different file
    let _createExampleResult = function (request) {
        //TODO: should this be somewhere else?
        var name = request.methodName;
        var result = null;

        switch (name) {
            case "getCurrentUserName":
                result = "Obi Won Kenobi"
                break;
            case "getCurrentUserEmail":
                result = "okenobi@jedicouncil.crst"
                break;
            case "getAccessToken":
                result = "12x45e783s1234="
                break;
            case "getCurrentUserRegions":
                result = ["Tatooine", "Stewjon", "Coruscant"]
                break;

            //Storage
            case "getItem":
            case "getGlobalItem":
                result = localStorage.getItem(request.data.key);
                break;
            case "setItem":
            case "setGlobalItem":
                localStorage.setItem(request.data.key, request.data.value);
                break;

            //Email
            case "sendAgenda":
            case "sendEmail":
            case "sendEmailHtml":
                var e = request.data;
                var body = e.body ? e.body : e.html ? e.html : "";
                var to = e.to ? e.to : e.emailAddress;
                var mailto = "mailto:" + to + "?subject=" + e.subject + "&body=" + body + "&cc=" + e.cc;
                window.open(mailto);
                break;
            //Agendas
            case "getAgendas":
                result = JSON.stringify([{ agendaId: "1", agendaTitle: "Bespin Meeting" }, { agendaId: "2", agendaTitle: "Endor Visit" }, { agendaId: "3", agendaTitle: "Hoth Beach Vacation" }])
                break;
        }

        window[request.successMethodId](result);
    }

    //Web OS
    let _tryCallWebFunction = function (request) {
        console.log("do something");
        let isManaged = false;
        //TODO: do a switch 

        return isManaged;
    }

    //Registered Fallback
    let _tryExecuteFallbackFunction = function (request) {
        let isManaged = false;
        let methodName = request.methodName;

        if (_fallback && _fallback[methodName] && typeof (_fallback[methodName]) === "function") {
            var promise = _fallback[methodName](request.data);
            isManaged = true;

            if (promise && promise.then) {
                promise.then(function (result) {
                    window[request.successMethodId](result);
                }).catch(function (result) {
                    window[request.errorMethodId](result);
                });
            } else if (promise) {
                console.error('Fallback methods needs to return a promise or nothing');
            } else {
                console.warn(methodName + ' was executed but does not return a promise');
                //resolve?
            }

        } else {
            console.warn("No fallback method for \"" + methodName + "\" exists");
        }

        return isManaged;
    }

    //Marshall
    let _callNativeFunction = function (methodName, methodData) {
        var id = Math.floor(Math.random() * 10000000);
        var successId = methodName + "_success_" + id;
        var errorId = methodName + "_error_" + id;

        return new Promise(function (resolve, reject) {
            //build success function
            window[successId] = function (data) {
                resolve(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //build error function
            window[errorId] = function (data) {
                reject(data);
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
            };

            //create request
            let request = {
                methodName: methodName,
                data: methodData,
                successMethodId: successId,
                errorMethodId: errorId
            };

            let os = _getParameterByName("os");

            //For Windows builds that don't pass in the os param
            let userAgent = navigator.userAgent;

            //  Windows
            if (os === "windows" || userAgent.includes("Windows.Desktop")) {
                return window.external.notify(JSON.stringify(request));
            }

            //  iOS
            if (os === "ios" || (window.webkit && window.webkit.messageHandlers.modus != undefined)) {
                return window.webkit.messageHandlers.modus.postMessage(request);
            }
            //  Android
            if (os === "android" || window.appInterface != undefined) {
                return window.appInterface.postMessage(JSON.stringify(request));
            }

            if (os === "web" && _tryCallWebFunction(request)) {
                //will need to attach to web event listener
            }

            // A class of fallback functions was registered
            if (_fallback && _tryExecuteFallbackFunction(request)) {
                return;
            }

            //Example Stub
            if (_areExamplesEnabled) {
                return _createExampleResult(request);
            }
        });
    }

    //Public
    return {
        //------ USER ------//
        /** @namespace User */

        /**
         * Get the current user's username
         * @returns {Promise<string>} promise with the username
         * @example
         *  Modus.getCurrentUserName().then((username) => {
         *      console.log("Hello, " + username);
         *  });
         * @memberof User
         * @version  iOS - 1.7.9  | Android - 2.1.6  |  Windows - 4.3.0.0
         */
        getCurrentUserName: _callNativeFunction.bind(null, "getCurrentUserName", null),

        /**
         * Get the current user's email
         * @returns {Promise<string>} current user email
         * @memberof User
         * @version  iOS - 2.6  | Android - 2.1.6  |  Windows - 5.0.0.0 
         */
        getCurrentUserEmail: _callNativeFunction.bind(null, "getCurrentUserEmail", null),

        /**
         * Returns the currently logged in user's regions
         * @memberof User
         * @version  iOS - 2.6.3  | Android - 2.1.6  |  Windows - N/A
         * @returns {Promise<string[]>} List of current user's regions
         */
        getCurrentUserRegions: _callNativeFunction.bind(null, "getCurrentUserRegions", null),

        /**
         * Returns the currently logged in user's access token
         * @memberof User
         * @version  iOS - 5.0.8  | Android - N/A  |  Windows - N/A
         * @returns {Promise<string>} An access token
         */
        getAccessToken: _callNativeFunction.bind(null, "getAccessToken", null),

        //----- Storage -----//
        /** @namespace Storage */

        /**
        * Gets a value for a specified key from the native local database
        * @param {string} key - name of the "key" you want to retrieve the value of
        * @returns {Promise<string>} The value of the key. If key does not exist `null` is returned
        * @example
        *   Modus.getItem("test").then((val) => { 
        *       //do something
        *   });
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - N/A
        */
        getItem: function (key) { return _callNativeFunction("getItem", { key: key }) },

        /**
        * Sets a value for a specified key to the native local database
        * @param {string} key - name of the "key" you want to set the value of
        * @param {string} value - The value you want to assign to the key
        * @example
        *   Modus.setItem("test", "Hello World!").then(() =>{ 
        *       // success!
        *       // no value returned
        *   });
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - 5.1.0.0
        */
        setItem: function (key, value) { return _callNativeFunction("setItem", { key: key, value: value }) },

        /**
        * Gets a value for a specified key from the native local database. This value is accessible between different web bundles
        * @param {string} key - name of the "key" you want to retrieve the value of
        * @returns {Promise<string>} The value of the key. If key does not exist `null` is returned
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - N/A
        */
        getGlobalItem: function (key) { return _callNativeFunction("getGlobalItem", { key: key }) },

        /**
        * Sets a value for a specified key to the native local database. This value is accessible between different web bundles
        * @param {string} key - name of the "key" you want to set the value of
        * @param {string} value - The value you want to assign to the key
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - 5.1.0.0
        */
        setGlobalItem: function (key, value) { return _callNativeFunction("setGlobalItem", { key: key, value: value }) },

        //----- Emails -----//
        /** @namespace Emails */

        sendEmail: function (to, cc, subject, body) { return _callNativeFunction("sendEmail", { to: to, cc: cc, subject: subject, body: body }) },
        sendEmailHtml: function (to, cc, subject, html) { return _callNativeFunction("sendEmailHtml", { to: to, cc: cc, subject: subject, html: html }) },
        sendEmailWithFileAttachmentFromBase64: function (data) { return _callNativeFunction("sendEmailWithFileAttachmentFromBase64", { data: data }) },

        //Agendas
        getAgendas: _callNativeFunction.bind(null, "getAgendas", null),
        sendAgenda: function (agendaId, emailAddress) { return _callNativeFunction("sendAgenda", { agendaId: agendaId, emailAddress: emailAddress }) },

        //Lead Capture
        scanBarcode: _callNativeFunction.bind(null, "scanPDF417Barcode", null),
        //captureLead?

        //File Pickers 
        getMediaWithPicker: function (excludeMedias) { return _callNativeFunction("getMediaWithPicker", { excludeMedias: excludeMedias }) },

        //Follow Up Methods
        sendFollowup: function (step, bundleName, link) { return _callNativeFunction("sendFollowup", { step: step, bundle: bundleName, link: link }) },
        previewNextFollowupLink: _callNativeFunction.bind(null, "previewNextFollowupLink", null),
        getFollowupGuid: function (followupLink) { return _callNativeFunction("getFollowupGuid", { link: followupLink }) },

        //Other
        asyncHttpRequest: function (url, verb, headers, body) { return _callNativeFunction("asyncHttpRequest", { url: url, verb: verb, headers: headers, body: body }) },
        promptShareMenuWithData: function (fileName, base64) { return _callNativeFunction("promptShareMenuWithData", { name: fileName, fileAsBase64: base64 }) },

        //Digial Sales Room - TODO: could this be generalizedbq
        getDeviceFilePicker: function (uploadParams) { return _callNativeFunction("getDeviceFilePicker", { uploadParams: uploadParams }) },

        //Modus Only
        registerFallback: function (fallback) { _fallback = fallback; },
        enableExamples: function (isEnabled) {
            if (typeof (isEnabled) === "undefined") isEnabled = true;
            _areExamplesEnabled = isEnabled
        }
    }
})();

window.Modus = Modus;

export default Modus;