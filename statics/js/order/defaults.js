var UIConfirmations = function () {

    var handleSample = function () {

        $('#bs_confirmation').on('confirmed.bs.confirmation', function () {
            alert('You confirmed action #1');
        });

        // $('#bs_confirmation').on('canceled.bs.confirmation', function () {
        //     alert('You canceled action #1');
        // });

    }


    return {
        //main function to initiate the module
        init: function () {

            handleSample();

        }

    };

}();

jQuery(document).ready(function() {
    UIConfirmations.init();
});