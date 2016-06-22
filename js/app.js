angular.module('isoApp',[])

.controller('analyzer',['$scope',function(scope)	{
	var req = this;

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

	req.startAnalysis = function($scope)	{
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
		req.res = [{dataType: "MTI", raw: mti, meaning: mtiMeaning}];

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

		req.res.push({dataType: "Bitmap", raw: bitmap, meaning: bitmap});

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
					req.res.push({dataType: dataElementDefinition[i], raw: x, meaning: x});
					req.dataElements = req.dataElements.substring(actualFeildLength);
				} else{
					var x = req.dataElements.substring(0, actualFeildLength);
					var validationFailed = validateDataElement(dataElementDefinition[i], x);
					if (validationFailed) {
						showErrorMessage();
						return //req.errorMessage = dataElementDefinition[i] + ' - ' + x + ' - contains invalid elements. Please check.'
					};
					req.res.push({dataType: dataElementDefinition[i], raw: x, meaning: x});
					req.dataElements = req.dataElements.substring(actualFeildLength);
				};
			};
		};

		var table = $('#ISO_results');
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
		if (dataElementDefinition.split('\n')[1].indexOf('x+n') > -1) {singleAlphaPlusNumerical = true};

		if (alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/.+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/.+/g, "") + '". Only alphabets, numbers and special characters are permitted. Please Check.';
			return true;
		} else if (singleAlphaPlusNumerical && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets, numbers are permitted. Please Check.';
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

		if (parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < dataElement.length) {
			req.errorMessage = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + dataElementDefinition.split('\n')[1].replace(/\D+/g, '') + '" digits. Please Check.';
			return true;
		};

		return false;
	};

		function initializeResultsTable(table)	{
			if (! $.fn.DataTable.fnIsDataTable(table)) {
			  setTimeout(function () {
			  	TableDatatablesButtons.init(); // initialize the results table
				}, 1);
			} else  {
				setTimeout(function () {
					table.dataTable().fnDraw()	// redraw the results table
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

	function validateDataElement(dataElementDefinition, dataElement)	{
		var alphabetsOnly = false;
		var numericOnly = false;
		var specialCharOnly = false;
		var binaryOnly = false;
		var singleAlphaPlusNumerical = false;

		if (dataElementDefinition.split('\n')[1].indexOf('a') > -1) {alphabetsOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('n') > -1) {numericOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('s') > -1) {specialCharOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('b') > -1) {binaryOnly = true};
		if (dataElementDefinition.split('\n')[1].indexOf('x+n') > -1) {singleAlphaPlusNumerical = true};

		if (alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/.+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/.+/g, "") + '". Only alphabets, numbers and special characters are permitted. Please Check.';
			return true;
		} else if (singleAlphaPlusNumerical && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets, numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z0-9]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z0-9]+/g, "") + '". Only alphabets and numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[0-9]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[0-9]+/g, "") + '". Only alphabets and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z]+/g, "") + '". Only numbers and special characters are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && numericOnly && !specialCharOnly && dataElement.replace(/\d+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/\d+/g, "") + '". Only numbers are permitted. Please Check.';
			return true;
		} else if (alphabetsOnly && !numericOnly && !specialCharOnly && dataElement.replace(/[A-Za-z]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/[A-Za-z]+/g, "") + '". Only alphabets are permitted. Please Check.';
			return true;
		} else if (!alphabetsOnly && !numericOnly && specialCharOnly && dataElement.replace(/^[A-Za-z0-9]+/g, "").length > 0) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", contains invalid elements - "' + dataElement.replace(/^[A-Za-z0-9]+/g, "") + '". Only special characters are permitted. Please Check.';
			return true;
		};

		if (parseInt(dataElementDefinition.split('\n')[1].replace(/\D+/g, '')) < dataElement.length) {
			req.error = dataElementDefinition + ' - "' + dataElement  + '", is longer than the permitted maximum of - "' + dataElementDefinition.split('\n')[1].replace(/\D+/g, '') + '" digits. Please Check.';
			return true;
		};

		return false;
	};

}])

/* .config(function($routeProvider, $locationProvider) {

 $routeProvider

 //analyzer view
 .when('/analyzer', {
		templateUrl : '../views/analyzer.html',
		controller: 'analyzer',
		controllerAs: 'request'
 })

 // generator view
 .when('/generator', {
 		templateUrl: '../views/generator.html',
 });

 // get rid of the hash in the URL
 $locationProvider.html5Mode(true);

}); Inject ng-route back into the app whenever you uncomment*/