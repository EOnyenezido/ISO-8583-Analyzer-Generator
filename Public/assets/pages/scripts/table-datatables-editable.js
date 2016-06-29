var TableDatatablesEditable = function () {

    var handleTable = function () {

        var optionArray = ['Primary account number (PAN)\n(n ..19)','Processing code\n(n 6)','Amount, transaction\n(n 12)','Amount, settlement\n(n 12)','Amount, cardholder billing\n(n 12)','Transmission date & time\n(n 10)','Amount, cardholder billing fee\n(n 8)','Conversion rate, settlement\n(n 8)','Conversion rate, cardholder billing\n(n 8)','System trace audit number (STAN)\n(n 6)','Time, local transaction (hhmmss)\n(n 6)','Date, local transaction (MMDD)\n(n 4)','Date, expiration\n(n 4)','Date, settlement\n(n 4)','Date, conversion\n(n 4)','Date, capture\n(n 4)','Merchant type\n(n 4)','Acquiring institution country code\n(n 3)','PAN extended, country code\n(n 3)','Forwarding institution. country code\n(n 3)','Point of service entry mode\n(n 3)','Application PAN sequence number\n(n 3)','Function code (ISO 8583:1993)/Network International identifier (NII)\n(n 3)','Point of service condition code\n(n 2)','Point of service capture code\n(n 2)','Authorizing identification response length\n(n 1)','Amount, transaction fee\n(x+n 8)','Amount, settlement fee\n(x+n 8)','Amount, transaction processing fee\n(x+n 8)','Amount, settlement processing fee\n(x+n 8)','Acquiring institution identification code\n(n ..11)','Forwarding institution identification code\n(n ..11)','Primary account number, extended\n(ns ..28)','Track 2 data\n(z ..37)','Track 3 data\n(n ...104)','Retrieval reference number\n(an 12)','Authorization identification response\n(an 6)','Response code\n(an 2)','Service restriction code\n(an 3)','Card acceptor terminal identification\n(ans 8)','Card acceptor identification code\n(ans 15)','Card acceptor name/location (1-23 address 24-36 city 37-38 state 39-40 country)\n(ans 40)','Additional response data\n(an ..25)','Track 1 data\n(an ..76)','Additional data - ISO\n(an ...999)','Additional data - national\n(an ...999)','Additional data - private\n(an ...999)','Currency code, transaction\n(a or n 3)','Currency code, settlement\n(a or n 3)','Currency code, cardholder billing\n(a or n 3)','Personal identification number data\n(b 64)','Security related control information\n(n 16)','Additional amounts\n(an ...120)','Reserved ISO\n(ans ...999)','Reserved ISO\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved national\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Reserved private\n(ans ...999)','Message authentication code (MAC)\n(b 16)','Bitmap, extended\n(b 1)','Settlement code\n(n 1)','Extended payment code\n(n 2)','Receiving institution country code\n(n 3)','Settlement institution country code\n(n 3)','Network management information code\n(n 3)','Message number\n(n 4)','Message number, last\n(n 4)','Date, action (YYMMDD)\n(n 6)','Credits, number\n(n 10)','Credits, reversal number\n(n 10)','Debits, number\n(n 10)','Debits, reversal number\n(n 10)','Transfer number\n(n 10)','Transfer, reversal number\n(n 10)','Inquiries number\n(n 10)','Authorizations, number\n(n 10)','Credits, processing fee amount\n(n 12)','Credits, transaction fee amount\n(n 12)','Debits, processing fee amount\n(n 12)','Debits, transaction fee amount\n(n 12)','Credits, amount\n(n 16)','Credits, reversal amount\n(n 16)','Debits, amount\n(n 16)','Debits, reversal amount\n(n 16)','Original data elements\n(n 42)','File update code\n(an 1)','File security code\n(an 2)','Response indicator\n(an 5)','Service indicator\n(an 7)','Replacement amounts\n(an 42)','Message security code\n(b 64)','Amount, net settlement\n(x+n 16)','Payee\n(ans 25)','Settlement institution identification code\n(n ..11)','Receiving institution identification code\n(n ..11)','File name\n(ans ..17)','Account identification 1\n(ans ..28)','Account identification 2\n(ans ..28)','Transaction description\n(ans ...100)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for ISO use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for national use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Reserved for private use\n(ans ...999)','Postillion Private Field\n(ans ......999999)','Message authentication code\n(b 64)'];

        optionArray = optionArray.sort();

        var availableOptions = '';

        for (var i = 0, len = optionArray.length; i < len; i++) {
            availableOptions += '<option>' + optionArray[i] + '</option>';
        };

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<select id="dataElement" class="bs-select form-control" ng-model="result.dataElement">' + availableOptions + '</select>';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
            jqTds[2].innerHTML = '<a class="edit btn default blue-stripe" href=""><i class="fa fa-save"></i>&nbsp;Save</a>';
            jqTds[3].innerHTML = '<a class="cancel btn default red-stripe" href=""><i class="fa fa-times"></i>&nbsp;Cancel</a>';
        }

        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            var aData = oTable.fnGetData();
            // Checks if that particular data element has been entered before
            if (nNew) {
                for (var i = 0, len = aData.length; i < len; i++) {
                    if (aData[i].indexOf($('#dataElement option:selected').text()) > -1) {
                        if (nNew) {
                            oTable.fnDeleteRow(nEditing);
                            nEditing = null;
                            nNew = false;
                            toastr.error('The entry was not saved!', 'Data Element Already Exists!');
                        } else {
                            restoreRow(oTable, nEditing);
                            nEditing = null;
                            toastr.error('The change was not saved!', 'Data Element Already Exists!')
                        };
                        return 
                    };
                };
            };            
            oTable.fnUpdate($('#dataElement option:selected').text(), nRow, 0, false);
            oTable.fnUpdate(jqInputs[0].value, nRow, 1, false);
            oTable.fnUpdate('<a class="edit btn default blue-stripe btn-xs" href="javascript:;">Edit&nbsp;&nbsp;<i class="fa fa-edit"></i></a>', nRow, 2, false);
            oTable.fnUpdate('<a class="delete btn default red-stripe btn-xs" href="javascript:;"><i class="fa fa-times"></i>&nbsp;Delete</a>', nRow, 3, false);
            oTable.fnDraw();
            toastr.success('The entry has been saved!', 'Data Element Saved Successfully');
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('*', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate('<a class="edit btn default blue-stripe btn-xs" href="javascript:;">Edit&nbsp;&nbsp;<i class="fa fa-edit"></i></a>', nRow, 2, false);
            oTable.fnDraw();
        }

        var table = $('#createISO');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            responsive: true,

            // set the initial value
            "pageLength": 5,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        toastr.options = {
          "closeButton": true,
          "debug": false,
          "positionClass": "toast-top-right",
          "onclick": null,
          "showDuration": "1000",
          "hideDuration": "1000",
          "timeOut": "2000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut",
          "progressBar": "true"
        }

        var tableWrapper = $("#createISO_wrapper");

        var nEditing = null;
        var nNew = false;

        $('#createISO_new').click(function (e) {
            e.preventDefault();

            if (nNew && nEditing && oTable.fnGetData().length > 0) {
                if (confirm("The last entry has not been saved. Do you wish to save it?")) {
                    saveRow(oTable, nEditing); // save
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    
                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure wou want to delete this entry?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            toastr.success('The entry has been deleted!', 'Entry Deleted Successfully')
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
                toastr.success('The entry was not saved!', 'Entry Cancelled Successfully');
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
                toastr.success('The change was not saved!', 'Change Cancelled Successfully')
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML.indexOf("Save") > -1) {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);
                nEditing = null;
                nNew = false;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();