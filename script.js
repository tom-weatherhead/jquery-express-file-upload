// To disable an eslint warning or error for an entire file, use this syntax: /* eslint no-alert: 0 */

// See https://stackoverflow.com/questions/34764287/turning-off-eslint-rule-for-a-specific-file

// eslint errors:
// - no-undef : '$' is not defined
// - no-alert : Unexpected alert

// If this file is loaded by index.html without using a route in server.js, the Web browser encounters the following error:
// - "The resource from “http://localhost:3000/script.js” was blocked due to MIME type mismatch (X-Content-Type-Options: nosniff)."

function sendPostRequest (fileInputTagId) {
	// See https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax :
	var data = new FormData();

	//jQuery.each(jQuery('#file')[0].files, function(i, file) {
	//	data.append('file-' + i, file);
	//});

	// See https://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery :
	let arrayOfFileObjects = $('#' + fileInputTagId)[0].files;	// eslint-disable-line no-undef

	if (!arrayOfFileObjects) {
		let message = "$('#' + fileInputTagId)[0].files is null; aborting POST.";

		console.error(message);
		alert(message);		// eslint-disable-line no-alert

		return;
	} else if (arrayOfFileObjects.length === 0) {
		let message = "$('#' + fileInputTagId)[0].files.length is " + arrayOfFileObjects.length + '; aborting POST.';

		console.error(message);
		alert(message);		// eslint-disable-line no-alert

		return;
	} else if (!arrayOfFileObjects[0]) {
		let message = "$('#' + fileInputTagId)[0].files[0] is null; aborting POST.";

		console.error(message);
		alert(message);		// eslint-disable-line no-alert

		return;
	}

	var fileObject = arrayOfFileObjects[0];

	// If fileKeyName is 'foo', the file data will be accessible in the server's app.post(req, res) event handler as req.files.foo
	const fileKeyName = 'file';

	data.append(fileKeyName, fileObject);

	$.ajax({		// eslint-disable-line no-undef
		url: '/',
		data: data,
		cache: false,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function (result) {
			console.log('Ajax POST success! : ', result);
			alert('Ajax POST success! : ' + result);		// eslint-disable-line no-alert
		},
		error: function (error) {
			let message = 'Ajax POST error: ' + error.status + ' ' + error.statusText + ' : ' + error.responseText;

			console.error(message);
			alert(message);		// eslint-disable-line no-alert
		}
	});
}

$('#form').submit(function (event) {		// eslint-disable-line no-undef
	console.log('#form submit()');
	sendPostRequest('fileForm');
	event.preventDefault();
});

$('#uploadButtonNoForm').click(function () {		// eslint-disable-line no-undef
	console.log('#uploadButtonNoForm click');
	sendPostRequest('fileNoForm');
});
