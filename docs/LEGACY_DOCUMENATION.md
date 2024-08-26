## Legacy Documentation

The following documentation will eventually be migrated to the BRIDGE_DOCUMENTION file

## Email Methods (not implemented in modus-js-bridge.js- requires use of depreciated/adrJsBridge.js):

### --- sendEmailWithPDFAttachmentFromHTML ---

Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied HTML markup, also using base 64 encoding for the parameters

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.9+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email
- attachmentHTML
  - (string) HTML to save as PDF and attach to email NOTE: this supports SVG

### --- sendEmailWithPDFAttachmentFromHTMLMultiPage ---

Sends an email via the platform's native mail application with a PDF attachment that is generated from the supplied array of HTML markup pages, also using base 64 encoding for the parameters

##### Implementation

| Platforms | Available |
| --------- | :-------: |
| iOS       |   4.3+    |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- to
  - (string) destination email address
- cc
  - (string) carbon copy email address
- subject
  - (string) subject of email
- body
  - (string) body of email
- attachmentHTMLPages
  - (array) Array of HTML pages to save as PDF and attach to email NOTE: this supports SVG

## Lead Capture Methods (not implemented in modus-js-bridge.js- requires use of depreciated/adrJsBridge.js):

### --- captureLead ---

Captures a lead and returns the scan string (encoded in base64)

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.2+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

## Follow Up Methods (available but not documented in modus-js-bridge.js):

### sendFollowup

Triggers a followup to happen within the app. It allows the user of this function to override the link added to the followup as well by setting the link param to be whatever link you want to send in an email with the appropriate templated email body that is the default behavior of the app. The other two params are optional and can be used in cases where web bundles need to indicate what step to open to in the followup link or indicate what bundle the link is being sent from.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **step**: (string) this is another item that will get appended to the url of the short link sent. It was used to indicate to the web bundle what "step" to open to when loading the link. Omitting it by setting it to "" or null will cause it to not be appended to the url.
- **bundleName**: (string) this is a string that indicates what web bundle is, it then gets added as a url param to the short link. Omitting it by setting it to "" or null will cause it to not be appended to the url.
- **link**: (string) this can be any link you would like to send in the followup, omitting it by setting it to "" or null will result in the app placing in the next followuplink short link for the media item associated with this bundle

### previewNextFollowupLink

Returns the next short link that will be sent in the followup for the corresponding media item associated with the web bundle. This does not increment the short link it just shows what the next one is going to be.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### getFollowupGuid

This method takes an adr.sh short link and returns the associated unique guid used for the Modus Microsite.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **link**: (string) this must be an adr.sh short link for this to work.

## Other Methods (available but not documented in modus-js-bridge.js):

### logEvent

Logs an event to the App Data Room analytics engine, which will then be queued to be sent up to Media Manager when a connection is available

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  1.7.0+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- **object**: (string) object parameter of event
- action
  - (string) action parameter of event
- additionalParams
  - (string) key value pair listing of additional parameters (example: "email:test@gmail.com")

### reloadPage

Reloads the page

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  4.1.7+   |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

This method has no parameters.

### asyncHttpRequest

Queues an http request in the mobile app's local database to be run when the app next has an available network connection. The app will retry a number of times and / or for a period of time in the event of a failure. You can provide a success and error callback function, but these functions only indicate the success or error of the request being parsed by the mobile app and placed into the database for future processing. The success or error callback functions do not indicate success or error of the actual HTTP request. Note: The request may end up firing at a much later date in the future (when the device is next online). In essence, you are firing off this request "blind" and your application must not depend on the outcome of this request. Example use cases include posting results of a quiz, or posting custom analytics data to a third party provider.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |   4.3+    |
| Android   |    N/A    |
| Windows   |    N/A    |

##### Parameters

- url
  - (string) url to send the http request to
- verb
  - (string) http verb to use in this request. Acceptable values: POST, GET, PUT, DELETE
- headers
  - (dictionary) key value pairs of additional headers. example: { name: 'John', time: '2pm' }
- body

  - (dictionary) body to post. example: { color: 'Red', fruit: 'Apple' }

### promptShareMenuWithData

This method allows a base 64 file to be shared via the share dropdown native to the device you are dealing with. For instance you could send a base64 file via an email, or you could save it to the files app on the device.

##### Availability

| Platforms | Available |
| --------- | :-------: |
| iOS       |  5.1.1+   |
| Android   |  4.4.2+   |
| Windows   |    N/A    |

##### Parameters

- fileAsBase64
  - (string) File represented in base64
- name
  -(string) The name of the file
