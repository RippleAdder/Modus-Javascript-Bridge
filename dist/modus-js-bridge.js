/* eslint-disable */
const _generateRandomId=function(){return Math.floor(1e7*Math.random())},_getParameterByName=function(e,n){const t=n||window.location.href,o=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+o+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null},WebMessenger=function(){const e=["http://localhost:8081","https://web.gomodus.com","https://web-stage.gomodus.com","web.gomodus.com","web-stage.gomodus.com","https://web-dev.gomodus.com","web-dev.gomodus.com"],n=function(n){if(e.indexOf(n.origin)<=-1)return;let t=JSON.parse(n.data),o=t.response||null,r=t.error||null;r?window[t.errorMethodId](r.error):window[t.successMethodId](o)};return{isManaged:function(e){return["getMediaWithPicker","getDeviceFilePicker","shareMailTo","closeContainer"].indexOf(e)>-1},start:function(){window.addEventListener("message",n,!1)},send:function(e){window.parent.postMessage(JSON.stringify(e),"*")}}};var Modus=function(){let e,n,t=null!==_getParameterByName("example");const o=function(o,r){var a=Math.floor(1e7*Math.random()),i=o+"_success_"+a,s=o+"_error_"+a;const l=function(e,n){window[i]=null,window[s]=null,delete window[i],delete window[s],e(n)};return new Promise((function(a,d){window[i]=l.bind(null,a),window[s]=function(e){d(e),window[i]=null,window[s]=null,delete window[i],delete window[s]};let u={methodName:o,data:r,successMethodId:i,errorMethodId:s},c=_getParameterByName("os");console.log("Trying to execute: ",o),console.log("OS:",c);let m=navigator.userAgent;return"windows"===c||m.includes("Windows.Desktop")?window.external.notify(JSON.stringify(u)):"ios"===c||window.webkit&&null!=window.webkit.messageHandlers.modus?window.webkit.messageHandlers.modus.postMessage(u):"android"===c||null!=window.appInterface?window.appInterface.postMessage(JSON.stringify(u)):"web"===c&&function(n){return e||(e=new WebMessenger,e.start()),e.send(n),!0}(u)||n&&function(e){let t=!1,o=e.methodName;if(n&&n[o]&&"function"==typeof n[o]){var r=n[o](e.data);t=!0,r&&r.then?r.then((function(n){window[e.successMethodId](n)})).catch((function(n){window[e.errorMethodId](n)})):r?console.error("Fallback methods needs to return a promise or nothing"):console.warn(o+" was executed but does not return a promise")}else console.warn('No fallback method for "'+o+'" exists');return t}(u)?void 0:t?function(e){var n=null;switch(e.methodName){case"getCurrentUserName":n="Obi Won Kenobi";break;case"getCurrentUserEmail":n="okenobi@jedicouncil.crst";break;case"getAccessToken":n="12x45e783s1234=";break;case"getCurrentUserRegions":n=["Tatooine","Stewjon","Coruscant"];break;case"getUser":n=JSON.stringify({id:12345,email:"okenobi@jedicouncil.crst",first_name:"Obi Won",last_name:"Kenobi"});break;case"getItem":case"getGlobalItem":n=localStorage.getItem(e.data.key);break;case"setItem":case"setGlobalItem":localStorage.setItem(e.data.key,e.data.value);break;case"sendAgenda":case"sendEmail":case"sendEmailHtml":var t=e.data,o=t.body?t.body:t.html?t.html:"",r="mailto:"+(t.to?t.to:t.emailAddress)+"?subject="+t.subject+"&body="+o+"&cc="+t.cc;window.open(r);break;case"getAgendas":n=JSON.stringify([{agendaId:"1",agendaTitle:"Bespin Meeting"},{agendaId:"2",agendaTitle:"Endor Visit"},{agendaId:"3",agendaTitle:"Hoth Beach Vacation"}]);break;case"shareMailTo":break;case"getMediaWithPicker":n=[14342,24232,34124,4135,54231];break;case"getDeviceFilePicker":window[e.errorMethodId]("getDeviceFilePicker is not an implemented example");break;default:return void window[e.errorMethodId]("no example exists for method")}window[e.successMethodId](n)}(u):void 0}))};return{getCurrentUserName:o.bind(null,"getCurrentUserName",null),getCurrentUserEmail:o.bind(null,"getCurrentUserEmail",null),getCurrentUserRegions:o.bind(null,"getCurrentUserRegions",null),getAccessToken:o.bind(null,"getAccessToken",null),getUser:o.bind(null,"getUser",null),getItem:function(e){return o("getItem",{key:e})},setItem:function(e,n){return o("setItem",{key:e,value:n})},getGlobalItem:function(e){return o("getGlobalItem",{key:e})},setGlobalItem:function(e,n){return o("setGlobalItem",{key:e,value:n})},sendEmail:function(e,n,t,r){return o("sendEmail",{to:e,cc:n,subject:t,body:r})},sendEmailHtml:function(e,n,t,r){return o("sendEmailHtml",{to:e,cc:n,subject:t,html:r})},sendEmailWithFileAttachmentFromBase64:function(e){return o("sendEmailWithFileAttachmentFromBase64",{data:e})},getAgendas:o.bind(null,"getAgendas",null),sendAgenda:function(e,n){return o("sendAgenda",{agendaId:e,emailAddress:n})},scanBarcode:o.bind(null,"scanPDF417Barcode",null),getMediaWithPicker:function(e){return o("getMediaWithPicker",{excludeMedias:e})},getDeviceFilePicker:function(e){return o("getDeviceFilePicker",{uploadParams:e})},shareMailTo:function(e){return o("shareMailTo",{mailTo:e})},closeContainer:()=>o("closeContainer",{}),asyncHttpRequest:function(e,n,t,r){return o("asyncHttpRequest",{url:e,verb:n,headers:t,body:r})},promptShareMenuWithData:function(e,n){return o("promptShareMenuWithData",{name:e,fileAsBase64:n})},sendFollowup:function(e,n,t){return o("sendFollowup",{step:e,bundle:n,link:t})},previewNextFollowupLink:o.bind(null,"previewNextFollowupLink",null),getFollowupGuid:function(e){return o("getFollowupGuid",{link:e})},registerFallbackFunctions:function(e){n=e},enableExamples:function(e){t=!1!==e}}}();window.Modus=Modus;export default Modus;