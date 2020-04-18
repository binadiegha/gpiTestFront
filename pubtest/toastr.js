//== Class definition
var ToastrDemo = function() {

    //== Private functions

    // basic demo
    var demo = function(param1) {
        var i = -1;
        var toastCount = 0;
        var $toastlast;

        var getMessage = function () {
            var msgs = [
                'Test Archiving completed successfully!'
            ];
            i++;
            if (i === msgs.length) {
                i = 0;
            }

            return msgs[i];
        };

        var getMessageWithClearButton = function (msg) {
            msg = msg ? msg : 'Clear itself?';
            msg += '<br /><br /><button type="button" class="btn btn-outline-light btn-sm m-btn m-btn--air m-btn--wide clear">Yes</button>';
            return msg;
        };

        $('#showtoast').click(function () {
            var shortCutFunction = 'success';

            // var msg = $('#message').val();
            var title = 'gpiTest Notice!'; //$('#title').val() || '';
            // var $showDuration = $('#showDuration');
            // var $hideDuration = $('#hideDuration');
            // var $timeOut = $('#timeOut');
            // var $extendedTimeOut = $('#extendedTimeOut');
            // var $showEasing = $('#showEasing');
            // var $hideEasing = $('#hideEasing');
            // var $showMethod = $('#showMethod');
            // var $hideMethod = $('#hideMethod');
            var toastIndex = toastCount++;
            var addClear = false; //$('#addClear').prop('checked');
//alert(addClear);
            toastr.options = {
                closeButton: false, //$('#closeButton').prop('checked'),
                debug: true, //$('#debugInfo').prop('checked'),
                newestOnTop: true, //$('#newestOnTop').prop('checked'),
                progressBar: true, //$('#progressBar').prop('checked'),
                positionClass: 'toast-top-right',
                preventDuplicates: false, //$('#preventDuplicates').prop('checked'),
                onclick: null
            };

            if ($('#addBehaviorOnToastClick').prop('checked')) {
                toastr.options.onclick = function () {
                    alert('You can perform some custom action after a toast goes away');
                };
            }

            //if ($showDuration.val().length) {
                toastr.options.showDuration = 300;
            //}

            //if ($hideDuration.val().length) {
                toastr.options.hideDuration = 1000;
            //}

            //if ($timeOut.val().length) {
                toastr.options.timeOut = addClear ? 0 : 5000;
            //}

            //if ($extendedTimeOut.val().length) {
                toastr.options.extendedTimeOut = addClear ? 0 : 1000;
            //}

            //if ($showEasing.val().length) {
                toastr.options.showEasing = 'swing';
            //}

            //if ($hideEasing.val().length) {
                toastr.options.hideEasing = 'linear';
            //}

            //if ($showMethod.val().length) {
                toastr.options.showMethod = 'fadeIn';
            //}

            //if ($hideMethod.val().length) {
                toastr.options.hideMethod = 'fadeOut';
            //}

            if (addClear) {
                msg = getMessageWithClearButton(msg);
                toastr.options.tapToDismiss = false;
            }
            //if (!msg) {
                msg = getMessage();
            //}

            $('#toastrOptions').text(
                    'toastr.options = '
                    + JSON.stringify(toastr.options, null, 2)
                    + ';'
                    + '\n\ntoastr.'
                    + shortCutFunction
                    + '("'
                    + msg
                    + (title ? '", "' + title : '')
                    + '");'
            );

            var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
            $toastlast = $toast;

            if(typeof $toast === 'undefined'){
                return;
            }

            if ($toast.find('#okBtn').length) {
                $toast.delegate('#okBtn', 'click', function () {
                    alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                    $toast.remove();
                });
            }
            if ($toast.find('#surpriseBtn').length) {
                $toast.delegate('#surpriseBtn', 'click', function () {
                    alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
                });
            }
            if ($toast.find('.clear').length) {
                $toast.delegate('.clear', 'click', function () {
                    toastr.clear($toast, { force: true });
                });
            }
        });

        function getLastToast(){
            return $toastlast;
        }
        $('#clearlasttoast').click(function () {
            toastr.clear(getLastToast());
        });
        $('#cleartoasts').click(function () {
            toastr.clear();
        });
    }

    return {
        // public functions
        init: function() {
            //alert(param1);
            var param1 = 'showtoast';
            demo(param1);
        }
    };
}();

