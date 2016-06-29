angular.module('isoApp',['ngRoute'])

.controller('analyzer',['$scope',function(scope)	{

	var req = this;

	var table = angular.element('#ISO_results');

	req.isHex = true;

	req.setMessageType = function()	{
		req.isHex = false;
		req.isPostilionDump = false;
		req.isAscii = false;
		req.isPowerCardDump = false;
		if (document.getElementById("HEX_radio").checked == true) {
        req.isHex = true;
    } else if (document.getElementById("Postilion_Dump_radio").checked == true)	{
    	req.isPostilionDump = true;
    } else if (document.getElementById("Ascii_radio").checked == true)	{
    	req.isAscii = true;
    } else if (document.getElementById("Powercard_Dump_radio").checked == true)	{
    	req.isPowerCardDump = true;
    };
	};

	req.error = false;

	var messageClass = ['Reserved for ISO use','Authorization','Financial','File action','Reversal/chargeback','Reconciliation','Administrative','Reserved for ISO use','Network management','Reserved for ISO use'];
	var messageFunction = ['Request','Request response','Advice','Advice Response','Notification','Notification Acknowledgement','Instruction (ISO 8583:2003 only)','Instruction Acknowledgement (ISO 8583:2003 only)','Reserved for ISO use. (Some implementations use for Response acknowledgment)','Reserved for ISO use. (Some implementations use for Negative acknowledgment)'];
	var messageOrigin = ['Acquirer','Acquirer Repeat','Issuer','Issuer Repeat','Other','Other Repeat'];

	var dataElementDefinition = ['Bit map\n(b 64)','Primary account number (PAN)\n(n ..19)','Processing code\n(n 6)','Amount, transaction\n(n 12)','Amount, settlement\n(n 12)','Amount, cardholder billing\n(n 12)','Transmission date & time\n(n 10)','Amount, cardholder billing fee\n(n 8)','Conversion rate, settlement\n(n 8)','Conversion rate, cardholder billing\n(n 8)','System trace audit number (STAN)\n(n 6)','Time, local transaction (hhmmss)\n(n 6)','Date, local transaction (MMDD)\n(n 4)','Date, expiration\n(n 4)','Date, settlement\n(n 4)','Date, conversion\n(n 4)','Date, capture\n(n 4)','Merchant type\n(n 4)','Acquiring institution country code\n(n 3)','PAN extended, country code\n(n 3)','Forwarding institution. country code\n(n 3)','Point of service entry mode\n(n 3)','Application PAN sequence number\n(n 3)','Function code (ISO 8583:1993)/Network International identifier (NII)\n(n 3)','Point of service condition code\n(n 2)','Point of service capture code\n(n 2)','Authorizing identification response length\n(n 1)','Amount, transaction fee\n(x+n 8)','Amount, settlement fee\n(x+n 8)','Amount, transaction processing fee\n(x+n 8)','Amount, settlement processing fee\n(x+n 8)','Acquiring institution identification code\n(n ..11)','Forwarding institution identification code\n(n ..11)','Primary account number, extended\n(ns ..28)','Track 2 data\n(z ..37)','Track 3 data\n(n ...104)','Retrieval reference number\n(an 12)','Authorization identification response\n(an 6)','Response code\n(an 2)','Service restriction code\n(an 3)','Card acceptor terminal identification\n(ans 8)','Card acceptor identification code\n(ans 15)','Card acceptor name/location (1-23 address 24-36 city 37-38 state 39-40 country)\n(ans 40)','Additional response data\n(an ..25)','Track 1 data\n(an ..76)','Additional data - ISO\n(an ...999)','Additional data - national\n(an ...999)','Additional data - private\n(an ...999)','Currency code, transaction\n(a or n 3)','Currency code, settlement\n(a or n 3)','Currency code, cardholder billing\n(a or n 3)','Personal identification number data\n(b 64)','Security related control information\n(n 16)','Additional amounts\n(an ...120)','Reserved ISO\n(ans ...999)','Reserved ISO\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Message authentication code (MAC)\n(b 16)','Bitmap, extended\n(b 1)','Settlement code\n(n 1)','Extended payment code\n(n 2)','Receiving institution country code\n(n 3)','Settlement institution country code\n(n 3)','Network management information code\n(n 3)','Message number\n(n 4)','Message number, last\n(n 4)','Date, action (YYMMDD)\n(n 6)','Credits, number\n(n 10)','Credits, reversal number\n(n 10)','Debits, number\n(n 10)','Debits, reversal number\n(n 10)','Transfer number\n(n 10)','Transfer, reversal number\n(n 10)','Inquiries number\n(n 10)','Authorizations, number\n(n 10)','Credits, processing fee amount\n(n 12)','Credits, transaction fee amount\n(n 12)','Debits, processing fee amount\n(n 12)','Debits, transaction fee amount\n(n 12)','Credits, amount\n(n 16)','Credits, reversal amount\n(n 16)','Debits, amount\n(n 16)','Debits, reversal amount\n(n 16)','Original data elements\n(n 42)','File update code\n(an 1)','File security code\n(an 2)','Response indicator\n(an 5)','Service indicator\n(an 7)','Replacement amounts\n(an 42)','Message security code\n(b 64)','Amount, net settlement\n(x+n 16)','Payee\n(ans 25)','Settlement institution identification code\n(n ..11)','Receiving institution identification code\n(n ..11)','File name\n(ans ..17)','Account identification 1\n(ans ..28)','Account identification 2\n(ans ..28)','Transaction description\n(ans ...100)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Postillion Private Field\n(ans ......999999)','Message authentication code\n(b 64)'];
	var dataLength = ['b 64','n ..19','n 6','n 12','n 12','n 12','n 10','n 8','n 8','n 8','n 6','n 6','n 4','n 4','n 4','n 4','n 4','n 4','n 3','n 3','n 3','n 3','n 3','n 3','n 2','n 2','n 1','x+n 8','x+n 8','x+n 8','x+n 8','n ..11','n ..11','ns ..28','z ..37','n ...104','an 12','an 6','an 2','an 3','ans 8','ans 15','ans 40','an ..25','an ..76','an ...999','an ...999','an ...999','a or n 3','a or n 3','a or n 3','b 64','n 16','an ...120','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','b 16','b 1','n 1','n 2','n 3','n 3','n 3','n 4','n 4','n 6','n 10','n 10','n 10','n 10','n 10','n 10','n 10','n 10','n 12','n 12','n 12','n 12','n 16','n 16','n 16','n 16','n 42','an 1','an 2','an 5','an 7','an 42','b 64','x+n 16','ans 25','n ..11','n ..11','ans ..17','ans ..28','ans ..28','ans ...100','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ...999','ans ......999999','b 64'];

	req.data;

	req.processing;

	req.startAnalysis = function($scope)	{
		req.processing = true;
		if (req.isHex) {
			req.iso = req.data;
			req.iso = hexDecompose(req.iso);
			req.analyze(req.iso);
		} else if (req.isAscii)	{
			req.iso = req.data;
			req.analyze(req.iso);
		}	else if (req.isPostilionDump)	{
			var selectedFile = $('#dumpFile')[0].files[0]; // only the first file is read even if the user selects multiple files
			if (selectedFile != undefined)	{
				var reader = new FileReader();
      		reader.onload = function(e) { 
	      		req.iso = e.target.result;
	      		req.iso = postilionDumpDecompose(req.iso);
	      		req.analyze(req.iso);
	      		scope.$digest(); // called to update the dom based on the results of req.analyze(). Without this the dom does not get updated.
      		}     		
      		reader.readAsText(selectedFile);
			}	else  {
				req.iso = postilionDumpDecompose(req.iso);
				req.analyze(req.iso);			
			}
		}
		else if (req.isPowerCardDump)	{ // analysis for a PowerCard dump
			showErrorMessage();
			return req.errorMessage = "PowerCard Dump function is not available currently. Development is pending PowerCard Documentation";
		}
		else  {
			showErrorMessage();
			return req.errorMessage = "Please select a message type";
		};
	};

	req.analyze = function(inputISO)	{
		//req.data = inputISO; This will channge the redisplay the input from the converted to a raw ISO message. Feature has been suppressed because the user may need his message in the original format. A possible option is to display the formatted ISO message in a different pane.
		var mti = inputISO.substring(0, 4);
		var mtiMeaning = messageOrigin[parseInt(mti[3])] + " " + messageClass[parseInt(mti[1])] + " " + messageFunction[parseInt(mti[2])];
		var mtiCheck = mtiMeaning.indexOf(undefined);
		if (mtiCheck > -1) {
			showErrorMessage();
			if (mtiCheck == 0) {return req.errorMessage = "Incorrect MTI - Message originator field is incorrect!"}
				else if (mtiCheck == 1) {return req.errorMessage = "Incorrect MTI - Message class field is incorrect!"}
					else if (mtiCheck == 2) {return req.errorMessage = "Incorrect MTI - Message function field is incorrect!"}
						else return req.errorMessage = "Incorrect MTI - Please check the MTI field";
		};
		req.res = [[ "MTI", mti, mtiMeaning]];

		var bitmap = inputISO.substr(4, 64);
		var bitmapEnd = 68;

		if (parseInt(bitmap[0]) == 1)	{
			bitmap = inputISO.substr(4, 128);
			bitmapEnd = 132;
		};

		for (var i = 0; i < bitmap.length; i++) {
			if (parseInt(bitmap[i]) > 1) {
				showErrorMessage();
				return req.errorMessage = "Incorrect Bitmap - Bitmap feild contains invalid character";
			};
		};

		req.res.push([ "Bitmap", bitmap, bitmap]);

		req.dataElements = inputISO.substring(bitmapEnd);

		for (var i = 1, len = bitmap.length; i < len; i++) {
			if (parseInt(bitmap[i]) == 1) {
				var variableFeildLength = false;
				var actualFeildLength;
				if (dataLength[i].indexOf('.') > -1) {
					variableFeildLength = true;
					var variableFeild = dataLength[i].match(/\./g).length;
				} else if (dataLength[i].indexOf('x+') > -1)	{
					actualFeildLength = parseInt(dataLength[i].replace(/^\D+/g, "")) + 1;
				}	else{
					actualFeildLength = parseInt(dataLength[i].replace(/^\D+/g, ""));
				};
				if (variableFeildLength) {
					actualFeildLength = parseInt(req.dataElements.substring(0, variableFeild));
					req.dataElements = req.dataElements.substring(variableFeild)
					var x = req.dataElements.substring(0, actualFeildLength);
					var validationFailed = validateDataElement(dataElementDefinition[i], x);
					if (validationFailed) {
						showErrorMessage();
						return //req.errorMessage = dataElementDefinition[i] + ' - ' + x + ' - contains invalid elements. Please check.'
					};
					req.res.push([dataElementDefinition[i], x, x]);
					req.dataElements = req.dataElements.substring(actualFeildLength);
				} else{
					var x = req.dataElements.substring(0, actualFeildLength);
					var validationFailed = validateDataElement(dataElementDefinition[i], x);
					if (validationFailed) {
						showErrorMessage();
						return //req.errorMessage = dataElementDefinition[i] + ' - ' + x + ' - contains invalid elements. Please check.'
					};
					req.res.push([dataElementDefinition[i], x, x]);
					req.dataElements = req.dataElements.substring(actualFeildLength);
				};
			};
		};

		initializeResultsTable(table);
		
	}

		function hexDecompose(hexInput)	{
			var hex = hexInput.replace(/\n|\s/g, '');
			var bitmap = hexToBinary(hex.substr(8, 16));
			var bitmapLength = 16;
			var bitmapEnd = 68;
			if (parseInt(bitmap[0]) == 1) {
				bitmap = hexToBinary(hex.substr(8, 32));
				bitmapEnd = 132;
				bitmapLength = 32;
			};
			hex = hexToAscii(hex.substr(0, 8)) + bitmap + hexToAscii(hex.substr(8 + bitmapLength));
			//hex = hex.replace(/\n|\s/g, '+');
			return hex;
		};

		function postilionDumpDecompose(dump)	{
			var lines = dump.split('\n');
			
			var res = '';
			
			for (var i = 0, len = lines.length; i < len; i++)	{
				res += lines[i].substring(12, 60);
			}
			
			return hexDecompose(res.replace(/\s/g, ''));
		};

		function showErrorMessage()	{
			req.error = true;
			$('#text_area').attr('class', 'form-group has-error');
			var table = $('#ISO_results');
			initializeResultsTable(table);
			req.processing = false;
		};

		function validateDataElement(dataElementDefinition, dataElement)	{ // Possible improvement - make this function a global function available to both controllers, or service/controller which can be injected into both controllers
		var alphabetsOnly = false;
		var numericOnly = false;
		var specialCharOnly = false;
		var binaryOnly = false;
		var singleAlphaPlusNumerical = false;

		if (dataElementDefinition.split('\n')[1].indexOf('a') > -1) {alphabetsOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('n') > -1) {numericOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('s') > -1) {specialCharOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('b') > -1) {binaryOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('x+n') > -1) {singleAlphaPlusNumerical = true;numericOnly = false; alphabetsOnly = false};

		if (alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/.+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/.+/g, "") + '". Only alphabets, numbers and special characters are permitted. Please Check.';
			return true;
		} else if (singleAlphaPlusNumerical && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets, numbers are permitted. Please Check.';
			console.log(dataElement.replace(/[A-Za-z0-9]+/g, "").length)
			return true;
		} else if (alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets and numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[0-9]+/g, "") + '". Only alphabets and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z]+/g, "") + '". Only numbers and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/\d+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/\d+/g, "") + '". Only numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z]+/g, "") + '". Only alphabets are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z0-9]+/g, "") + '". Only special characters are permitted. Please Check.';
			return true;
		};

		if (singleAlphaPlusNumerical && parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < (dataElement.length - 1)) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + (parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) + 1) + '" digits. Please Check.';
			return true;
		}else	if (!singleAlphaPlusNumerical && parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < dataElement.length) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + dataElementDefinition.split('\n')[1].replace(/\D+/g, '') + '" digits. Please Check.';
			return true;
		};

		return false;
		};

		function initializeResultsTable(table)	{
			if (! $.fn.DataTable.fnIsDataTable(table)) {
			  setTimeout(function () {
			  	TableDatatablesButtons.init(); // initialize the results table
			  	req.processing = false;
				}, 1);
			} else  {
				setTimeout(function () {
					table.dataTable().fnClearTable();
					table.dataTable().fnAddData(req.res);
					table.dataTable().fnDraw();	// redraw the results table
					req.processing = false;
				}, 1);
			}			
		};

		function hexToAscii(hexInput) {
		  var hex = hexInput.toString(); // in case the input is not a string
		  var ascii = '';
		  for (var i = 0, len = hex.length; i < len; i += 2)	{
		  	ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		  }
		  return ascii;
		};

		function hexToBinary(hexInput) {
		  if(!/^[0-9A-Fa-f]{1,64}$/.test(hexInput))return 0;
		  var res = '';
		  var lookupTable = {'0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100', '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001', 'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101', 'e': '1110', 'f': '1111', 'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'};
		  for (var i = 0, len = hexInput.length; i < len; i+=1)    {
		    res += lookupTable[hexInput[i]];
		  }
		  return res;
		}

		function readFile(file)	{
			//return true
			if (window.File && window.FileReader && window.FileList && window.Blob) {
			  if (file) {
      		var reader = new FileReader();
      		var results;     		
      		reader.readAsText(file);
      		reader.onload = function(e) { 
	      		var contents = e.target.result;
	      		results = {success: true, contents: contents}; 
      		}
      		return results;
    		} else { 
      		return {success: false, error: "Failed to load file"};
    		}
			} else {
			  return {success: false, error: 'The File APIs are not fully supported by your browser.'};
			}
		};
}])

.controller('generator', [function()	{
	TableDatatablesEditable.init(); // intialize the table for adding data elements
	ComponentsBootstrapSelect.init(); // intialize bootstrap select for MTI selection
	var req = this;

	var isoVersions = ['1987', '1993', '2003'];
	var isoClasses = ['Reserved for ISO use','Authorization','Financial','File action','Reversal/chargeback','Reconciliation','Administrative','Reserved for ISO use','Network management','Reserved for ISO use'];
	var isoFunctions = ['Request','Request response','Advice','Advice Response','Notification','Notification Acknowledgement','Instruction (ISO 8583:2003 only)','Instruction Acknowledgement (ISO 8583:2003 only)','Reserved for ISO use. (Some implementations use for Response acknowledgment)','Reserved for ISO use. (Some implementations use for Negative acknowledgment)'];
	var isoOrigin = ['Acquirer','Acquirer Repeat','Issuer','Issuer Repeat','Other','Other Repeat'];

	var dataElementDefinition = ['Bit map\n(b 64)','Primary account number (PAN)\n(n ..19)','Processing code\n(n 6)','Amount, transaction\n(n 12)','Amount, settlement\n(n 12)','Amount, cardholder billing\n(n 12)','Transmission date & time\n(n 10)','Amount, cardholder billing fee\n(n 8)','Conversion rate, settlement\n(n 8)','Conversion rate, cardholder billing\n(n 8)','System trace audit number (STAN)\n(n 6)','Time, local transaction (hhmmss)\n(n 6)','Date, local transaction (MMDD)\n(n 4)','Date, expiration\n(n 4)','Date, settlement\n(n 4)','Date, conversion\n(n 4)','Date, capture\n(n 4)','Merchant type\n(n 4)','Acquiring institution country code\n(n 3)','PAN extended, country code\n(n 3)','Forwarding institution. country code\n(n 3)','Point of service entry mode\n(n 3)','Application PAN sequence number\n(n 3)','Function code (ISO 8583:1993)/Network International identifier (NII)\n(n 3)','Point of service condition code\n(n 2)','Point of service capture code\n(n 2)','Authorizing identification response length\n(n 1)','Amount, transaction fee\n(x+n 8)','Amount, settlement fee\n(x+n 8)','Amount, transaction processing fee\n(x+n 8)','Amount, settlement processing fee\n(x+n 8)','Acquiring institution identification code\n(n ..11)','Forwarding institution identification code\n(n ..11)','Primary account number, extended\n(ns ..28)','Track 2 data\n(z ..37)','Track 3 data\n(n ...104)','Retrieval reference number\n(an 12)','Authorization identification response\n(an 6)','Response code\n(an 2)','Service restriction code\n(an 3)','Card acceptor terminal identification\n(ans 8)','Card acceptor identification code\n(ans 15)','Card acceptor name/location (1-23 address 24-36 city 37-38 state 39-40 country)\n(ans 40)','Additional response data\n(an ..25)','Track 1 data\n(an ..76)','Additional data - ISO\n(an ...999)','Additional data - national\n(an ...999)','Additional data - private\n(an ...999)','Currency code, transaction\n(a or n 3)','Currency code, settlement\n(a or n 3)','Currency code, cardholder billing\n(a or n 3)','Personal identification number data\n(b 64)','Security related control information\n(n 16)','Additional amounts\n(an ...120)','Reserved ISO\n(ans ...999)','Reserved ISO\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Message authentication code (MAC)\n(b 16)','Bitmap, extended\n(b 1)','Settlement code\n(n 1)','Extended payment code\n(n 2)','Receiving institution country code\n(n 3)','Settlement institution country code\n(n 3)','Network management information code\n(n 3)','Message number\n(n 4)','Message number, last\n(n 4)','Date, action (YYMMDD)\n(n 6)','Credits, number\n(n 10)','Credits, reversal number\n(n 10)','Debits, number\n(n 10)','Debits, reversal number\n(n 10)','Transfer number\n(n 10)','Transfer, reversal number\n(n 10)','Inquiries number\n(n 10)','Authorizations, number\n(n 10)','Credits, processing fee amount\n(n 12)','Credits, transaction fee amount\n(n 12)','Debits, processing fee amount\n(n 12)','Debits, transaction fee amount\n(n 12)','Credits, amount\n(n 16)','Credits, reversal amount\n(n 16)','Debits, amount\n(n 16)','Debits, reversal amount\n(n 16)','Original data elements\n(n 42)','File update code\n(an 1)','File security code\n(an 2)','Response indicator\n(an 5)','Service indicator\n(an 7)','Replacement amounts\n(an 42)','Message security code\n(b 64)','Amount, net settlement\n(x+n 16)','Payee\n(ans 25)','Settlement institution identification code\n(n ..11)','Receiving institution identification code\n(n ..11)','File name\n(ans ..17)','Account identification 1\n(ans ..28)','Account identification 2\n(ans ..28)','Transaction description\n(ans ...100)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Postillion Private Field\n(ans ......999999)','Message authentication code\n(b 64)'];
	req.raw = '';

	req.generate = function()	{
		req.error = false;

		var mti = isoVersions.indexOf(req.isoVersion).toString();
		mti += isoClasses.indexOf(req.isoClass).toString();
		mti += isoFunctions.indexOf(req.isoFunction).toString();
		mti += isoOrigin.indexOf(req.isoOriginator).toString();
		
		var bitmap = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

		var dataElementsArray = new Array(128);
		var isoDataElements = $('tbody>tr');
		// check if any data element has been added, display an error and return if none
		if (isoDataElements.children()[0].innerHTML == "No data available in table") {
			toastr.error('Please add at least one data element', 'No Data Elements Added!');
			return;
		};
		// check if the user is yet to save any data element
		if (isoDataElements.children()[0].innerHTML.indexOf('select') > -1) {
			toastr.warning('A data element has not been saved.', 'Please Save Data Element First!')
			return;
		};

		for (var i = 0, len = isoDataElements.length * 4; i < len; i+=4) {
			var validationFailed = validateDataElement(isoDataElements.children()[i].innerHTML, isoDataElements.children()[i+1].innerHTML);
			if (validationFailed) {
				return;
			};
			dataElementsArray[dataElementDefinition.indexOf(isoDataElements.children()[i].innerHTML)] = isoDataElements.children()[i+1].innerHTML;
			bitmap = bitmap.substr(0, dataElementDefinition.indexOf(isoDataElements.children()[i].innerHTML)) + '1' + bitmap.substr(dataElementDefinition.indexOf(isoDataElements.children()[i].innerHTML) + 1);
		};
		if (bitmap.substr(64).indexOf('1') > -1) { // chooses between a 64-bit and 128-bit bitmap based on the prescence or abscence of any data element that exceeds the 64 bit  
			bitmap = '1' + bitmap.substr(1);
		}	else  {
			bitmap = bitmap.substr(0, 64);
		};

		var dataElement = dataElementsArray.join('');
		
		req.raw = mti + bitmap + dataElement;

		generateHex(mti, bitmap, dataElement);
		generateAscii(req.raw);
		generateUrlEncoded(mti, bitmap, dataElement);
		generateBinary(mti, bitmap, dataElement);
	};

	req.clearTable = function()	{
		$('#createISO').dataTable().fnClearTable();
	};

	req.clearResult = function()	{
		req.raw = '';
		req.hex = '';
		req.ascii = '';
		req.urlEncoded = '';
		req.binary = '';
		req.error = false;
	};

	function generateHex(mti, bitmap, dataElement)	{
		req.hex = rawToHex(mti) + binToHex(bitmap) + rawToHex(dataElement);
	};

	function generateAscii(raw)	{
		req.ascii = rawToAscii(raw);
	};

	function generateUrlEncoded(mti, bitmap, dataElement)	{
		req.urlEncoded = mti + binToHex(bitmap) + dataElement;
	};

	function generateBinary(mti, bitmap, dataElement)	{
		req.binary = mti + bitmap + rawToBinary(dataElement);
	};

	function rawToHex(rawInput)	{
		var res = '';
		for (var i = 0, len = rawInput.length; i < len; i++) {
			res += rawInput[i].charCodeAt(0).toString(16);
		};
		return res;
	};

	function rawToAscii(rawInput)	{
		var res = '';
		for (var i = 0, len = rawInput.length; i < len; i++) {
			res += rawInput[i].charCodeAt(0);
		};
		return res;
	};

	function rawToBinary(rawInput)	{
		var res = '';
		for (var i = 0, len = rawInput.length; i < len; i++) {
			res += rawInput[i].charCodeAt(0).toString(2);
		};
		return res;
	};

	function binToHex(binInput)	{
		return parseInt(binInput, 2).toString(16);
	};

	function validateDataElement(dataElementDefinition, dataElement)	{ // Possible improvement - make this function a global function available to both controllers, or service/controller which can be injected into both controllers
		var alphabetsOnly = false;
		var numericOnly = false;
		var specialCharOnly = false;
		var binaryOnly = false;
		var singleAlphaPlusNumerical = false;

		if (dataElementDefinition.split('\n')[1].indexOf('a') > -1) {alphabetsOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('n') > -1) {numericOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('s') > -1) {specialCharOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('b') > -1) {binaryOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('x+n') > -1) {singleAlphaPlusNumerical = true;numericOnly = false; alphabetsOnly = false};

		if (alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/.+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/.+/g, "") + '". Only alphabets, numbers and special characters are permitted. Please Check.';
			return true;
		} else if (singleAlphaPlusNumerical && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets, numbers are permitted. Please Check.';
			console.log(dataElement.replace(/[A-Za-z0-9]+/g, "").length)
			return true;
		} else if (alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets and numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[0-9]+/g, "") + '". Only alphabets and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z]+/g, "") + '". Only numbers and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/\d+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/\d+/g, "") + '". Only numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z]+/g, "") + '". Only alphabets are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z0-9]+/g, "") + '". Only special characters are permitted. Please Check.';
			return true;
		};

		if (singleAlphaPlusNumerical && parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < (dataElement.length - 1)) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + (parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) + 1) + '" digits. Please Check.';
			return true;
		}else	if (!singleAlphaPlusNumerical && parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < dataElement.length) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + dataElementDefinition.split('\n')[1].replace(/\D+/g, '') + '" digits. Please Check.';
			return true;
		};

		return false;
	};

}])

.controller('mainController', function($scope, $rootScope, $location, Auth) {

 var currentUser = this;

 /*// get info if a person is logged in
 currentUser.loggedIn = Auth.isLoggedIn();

 if (currentUser.loggedIn) {
 		//Get the users full details
 		Auth.getUser()
 			.success(function(data) {
 				Auth.getUserByUsername(data.username)
 					.success(function(data)	{
 						currentUser.user = data;
 					}); 	
 			});
 } else if ($location.path() != '/')	{ // Check if user is already on the login page
 	// Redirect to the login page
 	toastr.error('Your are not currently logged in', 'Please Log In');
 	$location.path('/');
 };*/

 // check to see if a user is logged in on every request
 $rootScope.$on('$routeChangeStart', function() {
 		//currentUser.processing = true;
 		currentUser.loggedIn = Auth.isLoggedIn();

 		if (currentUser.loggedIn) {
 				//Get the users full details
 				Auth.getUser()
 					.success(function(data) {
 						Auth.getUserByUsername(data.username)
 							.success(function(data)	{
 								currentUser.user = data;
 							}); 	
 					});
 			angular.element(document).ready(function()	{currentUser.processing = false;}); 			
 		} else if ($location.path() != '/')	{
 			// Redirect to the login page
 			toastr.error('Your are not currently logged in', 'Please Log In');
 			$location.path('/');
 		};
 });

 // function to handle login form
 currentUser.doLogin = function() {

 	// add a processing icon
 	currentUser.processing = true;
 // call the Auth.login() function
 Auth.login(currentUser.loginData.username, currentUser.loginData.password)
 	.success(function(data) {

 		
 		if (data.success) {
 			// if a user successfully logs in, redirect to main page
 			$location.path('/analyzer');
 			//window.location = "/analyzer"; 			
 		}
 		else
			toastr.error(data.message, "Login error");
			// take out the processing icon
 			currentUser.processing = false;
 		
 	});
 };

 // function to handle logging out
 currentUser.doLogout = function() {
 	Auth.logout();
 	// reset all user info
 	currentUser.user = {};
 	$location.path('/');
 	//window.location = "/";
 };

 $scope.$on('$viewContentLoaded', function() {
 	App.init();  // initialize core components
 	currentUser.processing = false; // take out the processing icon
 	if (window.location.pathname == '/') {
 		Login.init(); // initialize login components for the login page
 	};
 });

})

.factory('Auth', function($http, $q, AuthToken) {

 // create auth factory object
 var authFactory = {};

 // log a user in
 authFactory.login = function(username, password) {

 	// return the promise object and its data
 	return $http.post('/api/authenticate', {
 		username: username,
 		password: password
 	})
 	.success(function(data) {
 		AuthToken.setToken(data.token);
 		return data;
 	});
 };

 // log a user out by clearing the token
 authFactory.logout = function() {
 	// clear the token
 	AuthToken.clearToken();
 };

 // check if a user is logged in
 // checks if there is a local token
 authFactory.isLoggedIn = function() {
 	if (AuthToken.getToken())
 		return true;
	else
 		return false;
 	};

 // get the logged in user
 authFactory.getUser = function() {
 	if (AuthToken.getToken())
 		return $http.get('/api/me', { cache: false});
 	else
 		return $q.reject({ message: 'User is not logged in.' });
 	};

 	authFactory.getUserByUsername = function(username)	{
 		if (AuthToken.getToken) {
 			return $http.get('/api/username/' + username);
 		} else{
 			return $q.reject({ message: 'User is not logged in.' });
 		};
 	}

 // return auth factory object
 return authFactory;

 })

 // ===================================================
 // factory for handling tokens
 // inject $window to store token client-side
 // ===================================================
.factory('AuthToken', function($window) {

 var authTokenFactory = {};

 // get the token out of local storage
 authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('tib_mon_token');
 };

 // function to set token or clear token
 // if a token is passed, set the token
 // if there is no token, clear it from local storage
 authTokenFactory.setToken = function(token) {
 	if (token)
 		$window.localStorage.setItem('tib_mon_token', token);
 };

 // clear the token
 authTokenFactory.clearToken = function()	{
 	$window.localStorage.removeItem('tib_mon_token');
 }

 return authTokenFactory;

 })

 // ===================================================
 // application configuration to integrate token into requests
 // ===================================================
.factory('AuthInterceptor', function($q, AuthToken) {

 var interceptorFactory = {};

 // this will happen on all HTTP requests
 interceptorFactory.request = function(config) {

 // grab the token
 var token = AuthToken.getToken();

 // if the token exists, add it to the header as x-access-token
 if (token)
 	config.headers['x-access-token'] = token;
 	return config;
 };

 // happens on response errors
 interceptorFactory.responseError = function(response) {

 	// if our server returns a 403 forbidden response
 	if (response.status == 403) {
 		AuthToken.clearToken();
 		$location.path('/');
 	}

 	// return the errors from the server as a promise
 	return $q.reject(response);
 };

 return interceptorFactory;

 })

.factory('User', function($http) {

	// create a new object
	var userFactory = {};
	
	// get a single user
	userFactory.getUser = function(id) {
		return $http.get('/api/users/' + id);
	};

	// get all users
	userFactory.allUsers = function() {
		return $http.get('/api/users/');
	};

	// create a user
	userFactory.createUser = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update a user
	userFactory.updateUser = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// delete a user
	userFactory.deleteUser = function(id) {
		return $http.delete('/api/users/' + id);
	};

	// return our entire userFactory object
	return userFactory;
})

// user controller for the main page
// inject the User factory
.controller('userController', function(User) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the users at page load
	User.allUsers()
	.success(function(data) {

		// when all the users come back, remove the processing variable
		vm.processing = false;

		// bind the users that come back to vm.users
		vm.users = data;
	});

	// function to delete a user
	vm.deleteUser = function(id) {
		vm.processing = true;

  	// accepts the user id as a parameter
  	User.deleteUser(id)
  	.success(function(data) {

  		// get all users to update the table
  		// you can also set up your api
  		// to return the list of users with the delete call
  		toastr.success(data.message, "Successfully Deleted");
  		User.allUsers()
  		.success(function(data) {
  			vm.processing = false;
  			vm.users = data;
  		});
  	});
  };

  vm.approveUser = function(id)	{
  	vm.processing = true;

  	User.updateUser(id, {isApproved: true})
  	.success(function(data)	{
  		if (!data.error) {
  			toastr.success(data.message, "Successfully Unblocked");
  		} else{
  			toastr.error(data.message, "Failure");
  		};
  		
  		User.allUsers()
  		.success(function(data) {
  			vm.processing = false;
  			vm.users = data;
  		});
  	});
  };

  vm.blockUser = function(id)	{
  	vm.processing = true;

  	User.updateUser(id, {isApproved: false})
  	.success(function(data)	{
  		if (!data.error) {
  			toastr.success("User access successfully restricted", "Successfully Blocked");
  		} else{
  			toastr.error(data.message, "Failure");
  		};
  		
  		User.allUsers()
  		.success(function(data) {
  			vm.processing = false;
  			vm.users = data;
  		});
  	});
  };
})

// controller applied to user creation page
.controller('userCreateController', function(User, $location) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create a user
	vm.saveUser = function() {
		vm.processing = true;

		// clear the message
		vm.message = '';

		if (vm.userData.name && vm.userData.email && vm.userData.username && vm.userData.password) {
			// use the create function in the userService
 			User.createUser(vm.userData)
 			.success(function(data) {
 				vm.processing = false;

 				// clear the form
 				vm.userData = {};
 				if (data.success) {
 					toastr.success(data.message,'Success');
 					$location.path('/analyzer');
 					//window.location = "/analyzer";
 				} else{
 					toastr.error(data.message,'Failure');
 				};
			});
		} else{
			// display a warning message if fields are incomplete
			toastr.warning('Please complete all feilds below!','Incomplete details');
		};
	};
})

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

})

.config(function($routeProvider, $locationProvider) {

 $routeProvider

 //login view
 .when('/', {
		templateUrl : '../login.html',
		controller: 'mainController as login'
 })

 //analyzer view
 .when('/analyzer', {
		templateUrl : '../analyzer.html',
		controller: 'mainController as main'
 })

 //users view
 .when('/users', {
		templateUrl : '../users.html',
		controller: 'mainController as main'
 })

 // generator view
 .when('/generator', {
 		templateUrl: '../generator.html',
 		controller: 'mainController as main'
 })

 // any other url
 .otherwise({
 	redirectTo: '/'
 });

 // get rid of the hash in the URL
 $locationProvider.html5Mode(true);

});