/* eslint-disable */

//Helpers
const _generateRandomId = function () {
    return Math.floor(Math.random() * 10000000);
}
const _getParameterByName = function (name, url) {
    const url2 = url ? url : window.location.href;
    const name2 = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name2 + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url2);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//Web Communicator
//TODO: break this in to a different file?
const WebMessenger = function () {
    const VALID_DOMAINS = ["gomodus.com", "mytopconnow.topconpositioning.com", "showroom.cat.com", "lunatigarage.vsgdover.com", "salesmaster.volvotrucks.us"]
    const VALID_ORIGINS = ['http://localhost:8081'];

    //private
    const recieve = function (event) {
        const hasValidDomain = VALID_DOMAINS.filter(domain => { return event.origin.indexOf(domain) > -1 }).length > 0;
        const hasValidOrigin = VALID_ORIGINS.indexOf(event.origin) > -1;
        if (!hasValidDomain && !hasValidOrigin) return;

        let data = JSON.parse(event.data);
        let response = data.response || null;
        let error = data.error || null;

        //Process the response
        if (error) {
            window[data.errorMethodId](error.error);
        } else {
            window[data.successMethodId](response);
        }
    }


    //public
    return {
        start: function () {
            window.addEventListener('message', recieve, false);
        },
        send: function (request) {
            window.parent.postMessage(JSON.stringify(request), "*");
        }
    }
}

//Primary Class
var Modus = (function () {
    //Variables
    let _webMessenger;
    let _fallback;
    let _areExamplesEnabled = _getParameterByName("example") !== null;

    //TODO: Break this in to a different file
    const _createExampleResult = function (request) {
        //TODO: should this be somewhere else?
        var name = request.methodName;
        var result = null;

        switch (name) {
            case "getCurrentUserName":
                result = "Obi Won Kenobi";
                break;
            case "getCurrentUserEmail":
                result = "okenobi@jedicouncil.crst";
                break;
            case "getAccessToken":
                result = "12x45e783s1234=";
                break;
            case "getCurrentUserRegions":
                result = ["Tatooine", "Stewjon", "Coruscant"];
                break;
            case "getUser":
                result = JSON.stringify({ id: 12345, email: "okenobi@jedicouncil.crst", first_name: "Obi Won", last_name: "Kenobi", });
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
            //mailTo
            case 'shareMailTo':
                break;
            //Media
            case "getMediaWithPicker":
                result = [14342, 24232, 34124, 4135, 54231];
                break;
            case "getDeviceFilePicker":
                window[request.errorMethodId]("getDeviceFilePicker is not an implemented example");
                break;
            default:
                window[request.errorMethodId]("no example exists for method");
                return;
        }

        window[request.successMethodId](result);
    }

    //Helpers
    const _checkSupport = (supportedOSList) => {
        console.warn("that function not supported in the bridge for that OS yet")
        const os = _getParameterByName("os");
        return supportedOSList.indexOf(os) > -1;
    }

    //Web OS
    const _tryCallWebFunction = function (request) {
        if (!_webMessenger) {
            _webMessenger = new WebMessenger();
            _webMessenger.start();
        }

        _webMessenger.send(request);
        return true;

    }

    //Registered Fallback
    const _tryExecuteFallbackFunction = function (request) {
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
    const _callNativeFunction = function (methodName, methodData) {
        var id = _generateRandomId();
        var successId = methodName + "_success_" + id;
        var errorId = methodName + "_error_" + id;

        return new Promise(function (resolve, reject) {

            //build success function
            window[successId] = function (data) {
                window[successId] = null;
                window[errorId] = null;
                delete window[successId];
                delete window[errorId];
                resolve(data);
            }

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

            //some debugging info
            console.log("Trying to execute: ", methodName)
            console.log("OS:", os);

            //For Windows builds that don't pass in the os param
            let userAgent = navigator.userAgent;

            //  React Native Application
            if (os === "rn") {
                let doubleWrapper = JSON.stringify(JSON.stringify(request));
                console.log("firing rn request, double wrapped: ", doubleWrapper);
                window.ReactNativeWebView.postMessage("test");
                window.ReactNativeWebView.postMessage(doubleWrapper);
                return;
            }

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
                return;
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
         *  Modus.getCurrentUserName().then((username) => { });
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
         * @example
         *  Modus.getAccessToken().then((token) => { });
         * @version  iOS - 5.0.8  | Android - N/A  |  Windows - N/A
         * @returns {Promise<string>} An access token
         */
        getAccessToken: _callNativeFunction.bind(null, "getAccessToken", null),

        /**
         * Returns the currently logged in user (serialized)
         * @memberof User
         * @version  iOS - 6.5.0 | Android - N/A  |  Windows - N/A
         * @example
         *  Modus.getUser().then((userJSON) => { });
         * @example 
         * // returns 
         * {"id":12345,"email":"okenobi@jedicouncil.crst","first_name":"Obi Won","last_name":"Kenobi"}
         * @returns {Promise<string>} A serialized user object
         */
        getUser: _callNativeFunction.bind(null, "getUser", null),

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
        getItem: function (key) { return _callNativeFunction("getItem", { key: key }); },

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
        setItem: function (key, value) { return _callNativeFunction("setItem", { key: key, value: value }); },

        /**
        * Gets a value for a specified key from the native local database. This value is accessible between different web bundles
        * @param {string} key - name of the "key" you want to retrieve the value of
        * @returns {Promise<string>} The value of the key. If key does not exist `null` is returned
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - N/A
        */
        getGlobalItem: function (key) { return _callNativeFunction("getGlobalItem", { key: key }); },

        /**
        * Sets a value for a specified key to the native local database. This value is accessible between different web bundles
        * @param {string} key - name of the "key" you want to set the value of
        * @param {string} value - The value you want to assign to the key
        * @memberof Storage
        * @version  iOS - 1.7.0  | Android - N/A  |  Windows - 5.1.0.0
        */
        setGlobalItem: function (key, value) { return _callNativeFunction("setGlobalItem", { key: key, value: value }); },

        //----- Emails -----//
        /** @namespace Emails */

        /**
        * @param {string} to - reciept email address
        * @param {string} cc - carbon copy email address
        * @param {string} subject - subject of the email
        * @param {string} body - body of the email (plaintext only)
        * @example
        *   Modus.sendEmail("test@gmail.com", "", "Test Subject Line", "Test body").then(() =>{
                //email sent successfully
            });
        * @returns {Promise}. No data returned.
        * @memberof Emails
        * @version  iOS - 1.7.0  | Android - 2.1.6+  |  Windows - N/A
        */
        sendEmail: function (to, cc, subject, body) { return _callNativeFunction("sendEmail", { to: to, cc: cc, subject: subject, body: body }); },

        /**
        * @param {string} to - reciept email address
        * @param {string} cc - carbon copy email address
        * @param {string} subject - subject of the email
        * @param {string} html - body of the email (HTML)
        * @example
        *   Modus.sendEmail("test@gmail.com", "", "Test Subject Line", "<h1>Hello World!</h1>").then(() =>
        *       //email sent successfully
        *   }).catch((ex) =>{
        *       //email failed to send
        *   });
        * @returns {Promise}. No data returned.
        * @memberof Emails
        * @version  iOS - 1.7.0  | Android - 2.1.6+  |  Windows - N/A
        */
        sendEmailHtml: function (to, cc, subject, html) { return _callNativeFunction("sendEmailHtml", { to: to, cc: cc, subject: subject, html: html }); },

        /**
        * @param {string} to - destination email address
        * @param {string} cc - carbon copy email address
        * @param {string} subject - subject of the email
        * @param {string} html - body of the email (plaintext)
        * @param {string} attachmentName - file name of the attachment (you must include the extension)
        * @param {string} attachmentBase64 - Base 64 representation of the file you would like to attach
        * @example
        *   Modus.sendEmail("test@gmail.com", "", "Subject Line for HTML", "Check out my attachments").then(() =>
        *       //email sent successfully
        *   }).catch((ex) =>{
        *       //email failed to send
        *   });
        * @returns {Promise}. No data returned.
        * @memberof Emails
        * @version  iOS - 5.0.8+  | Android - 4.3.0+  |  Windows - 5.0.0.0+
        */
        sendEmailWithFileAttachmentFromBase64: function (data) { return _callNativeFunction("sendEmailWithFileAttachmentFromBase64", { data: data }); },

        //----- Agendas -----//
        /** @namespace Agendas */

        /**
        * @example
        *   Modus.getAgendas().then((agendas) => {
        *       //do something
        *   });
        * @returns {Promise<Array<Agenda>>}. returns an array of agendas
        * @memberof Agendas
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A
        */
        getAgendas: _callNativeFunction.bind(null, "getAgendas", null),

        /**
        * @param {Object<agenda>} agendaId - The id of the agenda to email
        * @param {Object<agenda>} emailAddress - destination email address
        * @example
        *   Modus.sendAgenda(12354, "example@gomodus.com").then((agendas) => {
        *       //native email client opened successfully
        *   });
        * @returns {Promise}  no data returned
        * @memberof Agendas
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A
        */
        sendAgenda: function (agendaId, emailAddress) { return _callNativeFunction("sendAgenda", { agendaId: agendaId, emailAddress: emailAddress }); },

        //----- Agendas -----//
        /** @namespace Lead_Capture */

        /**
        * Scans a barcode and returns the text encoded in the barcode
        * @returns {Promise<String>}. returns text encoded in barcode
        * @memberof Lead_Capture
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A
        */
        scanBarcode: _callNativeFunction.bind(null, "scanPDF417Barcode", null),

        //----- Media -----//
        /** @namespace Media */

        /**
        * Opens a media picker in the app that allows a user to choose Modus media items
        * @param {Object<agenda>} excludeMediaIds - Ids of media items you don't want to show in the media picker
        * @example
        *   Modus.getMediaWithPicker(null).then((mediaIds) => {
        *       //do something
        *   });
        * @returns {Promise<Array<Int>>}. returns an array of media ids
        * @memberof Media
        * @deprecated use getAssetsWithPicker instead
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A  | Web - no support
        */
        getMediaWithPicker: function (excludeMediaIds) { return _callNativeFunction("getMediaWithPicker", { excludeMedias: excludeMediaIds }); },
        getDeviceFilePicker: function (uploadParams) { return _callNativeFunction("getDeviceFilePicker", { uploadParams: uploadParams }); },

        //----- Assets -----//
        /** @namespace Assets */

        /**
        * Opens a media picker in the app that allows a user to choose Modus assets
        * @param {Object<agenda>} excludeMediaIds - ids of media items you don't want to show in the media picker
        * @example
        *   Modus.getAssetsWithPicker(null).then(({mediaIds,vptIds}) => {
        *       //do something
        *   });
        * @returns {Promise<Object>}. returns an object like this {mediaIds: [], vptIds: []}
        * @memberof Assets
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A  | Web
        */
        getAssetsWithPicker: function (excludeMediaIds) {
            if (!_checkSupport(['web'])) {
                return this.getMediaWithPicker(excludeMediaIds);
            }

            return _callNativeFunction("getAssetsWithPicker", { excludeMediaIds });
        },

        //----- Other -----//
        /** @namespace Other */

        /**
        * @param {string} mailTo - a mailTo link to open in native/attached application
        * @example
        *   Modus.shareMailTo("mailto:?to=test@helloworld.com&body=Thanks for meeting with me today")
        * @returns {Promise}. No data returned.
        * @memberof Other
        * @version  iOS - N/A  | Android - N/A  |  Windows - N/A
        */
        shareMailTo: function (mailTo) { return _callNativeFunction('shareMailTo', { mailTo: mailTo }); },
        /**
         * Function to close the containing modal/dialog in an application
         * @example
         *  Modus.closeModal();
         * @memberof Other
         */
        closeContainer: () => { return _callNativeFunction('closeContainer', {}); },

        //TODO: document 
        asyncHttpRequest: function (url, verb, headers, body) { return _callNativeFunction("asyncHttpRequest", { url: url, verb: verb, headers: headers, body: body }); },
        promptShareMenuWithData: function (fileName, base64) { return _callNativeFunction("promptShareMenuWithData", { name: fileName, fileAsBase64: base64 }); },
        sendFollowup: function (step, bundleName, link) { return _callNativeFunction("sendFollowup", { step: step, bundle: bundleName, link: link }); },
        previewNextFollowupLink: _callNativeFunction.bind(null, "previewNextFollowupLink", null),
        getFollowupGuid: function (followupLink) { return _callNativeFunction("getFollowupGuid", { link: followupLink }); },

        //---- Modus Things -----// 
        //accessible but used internally - not needed to be documented
        registerFallbackFunctions: function (fallback) { _fallback = fallback; },
        enableExamples: function (isEnabled) { _areExamplesEnabled = isEnabled !== false; }

    }
})();


window.Modus = Modus;
export default Modus;
