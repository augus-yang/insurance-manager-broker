var Update = function () {
    var decideIsHide = function (divId) {
        var applicant = $('#form input[name="applicant"]').val();
        var insurant = $('#form input[name="insurant"]').val();
        if(applicant == insurant){
            $('#' + divId).hide();
        } else {
            $('#' + divId).show();
        }
    }

    var mayHide = function(divId) {
        $('#form input[name="insurant"]').on('input', function(){
            decideIsHide(divId);
        })
    }

    var initValidation = function () {
        formKit.init({
            liId: 'insuranceLi',
            valid: {
                method: 'put',
                url: '/insuranceOrder/' + $('#form input[name="id"]').val(),
                names: ['insuranceCompany', 'productName', 'dollar', 'paidYears', 'applicantSmoke', 'applicant',
                    'applicantSex', 'applicantNatinoality', 'applicantAge', 'applicantId', 'applicantPermit', 'applicantPassport',
                    'applicantCompany', 'applicantCompanyAddress', 'applicantJob', 'applicantPosition', 'applicantSalaryYear', 'applicantIdAddress',
                    'applicantAddress', 'insurant', 'insurantSex', 'relation', 'insurantNatinoality', 'insurantAge',
                    'insurantId', 'insurantPermit', 'insurantPassport', 'insurantCompany', 'insurantCompanyAddress', 'insurantJob',
                    'insurantPosition', 'insurantSalaryYear', 'insurantIdAddress', 'insurantAddress', 'insurantSmoke', 'beneficiary',
                    'scale', 'hkDate'],
                success: function () {
                    window.location.href = '/order/detail/' + $('#form input[name="orderId"]').val()
                },
                rules: {
                    insuranceCompany: {
                        required: true
                    },
                    productName: {
                        required: true
                    },
                    dollar: {
                        required: true
                    },
                    paidYears: {
                        required: true
                    },
                    applicantSmoke: {
                        required: true
                    },
                    applicant: {
                        required: true
                    },
                    applicantSex: {
                        required: true
                    },
                    applicantNatinoality: {
                        required: true
                    },
                    applicantAge: {
                        required: true
                    },
                    applicantId: {
                        required: true
                    },
                    applicantPermit: {
                        required: true
                    },
                    applicantPassport: {
                        required: true
                    },
                    applicantCompany: {
                        required: true
                    },
                    applicantCompanyAddress: {
                        required: true
                    },
                    applicantJob: {
                        required: true
                    },
                    applicantPosition: {
                        required: true
                    },
                    applicantSalaryYear: {
                        required: true
                    },
                    applicantIdAddress: {
                        required: true
                    },
                    applicantAddress: {
                        required: true
                    },
                    insurant: {
                        required: true
                    },
                    insurantSex: {
                        required: true
                    },
                    relation: {
                        required: true
                    },
                    insurantNatinoality: {
                        required: true
                    },
                    insurantAge: {
                        required: true
                    },
                    insurantId: {
                        required: true
                    },
                    insurantPermit: {
                        required: true
                    },
                    insurantPassport: {
                        required: true
                    },
                    insurantCompany: {
                        required: true
                    },
                    insurantCompanyAddress: {
                        required: true
                    },
                    insurantJob: {
                        required: true
                    },
                    insurantPosition: {
                        required: true
                    },
                    insurantSalaryYear: {
                        required: true
                    },
                    insurantIdAddress: {
                        required: true
                    },
                    insurantAddress: {
                        required: true
                    },
                    insurantSmoke: {
                        required: true
                    },
                    beneficiary: {
                        required: true
                    },
                    scale: {
                        required: true
                    },
                    hkDate: {
                        required: true
                    }
                }
            }
        });
    }

    var initData = function () {
        pageKit.init({
            liId: 'insuranceLi',
            create: '/beneficiary/create/' + $('#form input[name="id"]').val(),
            del: '/beneficiary/del',
            table: {
                url: '/beneficiary/' + $('#form input[name="id"]').val(),
                columns: [
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<label class="mt-checkbox mt-checkbox-outline mt-checkbox-single"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                        }
                    },
                    {"data": "name"},
                    {"data": "scale"},
                    {"data": "createdAt"},
                    {"data": "updatedAt"},
                    {
                        "data": "id",
                        "render": function (data) {
                            return '<a href="/beneficiary/update/' + data + '" class="btn btn-sm btn-outline grey-salsa"><i class="fa fa-edit"></i>更新</a>'
                                + '<a class="btn btn-sm btn-outline grey-salsa" data-toggle="modal" data-target="#del" data-id="' + data + '"><i class="fa fa-trash"></i>删除</a>';
                        }
                    }
                ]
            }
        });
    }

    return {
        init: function () {
            decideIsHide('mayHide');
            mayHide('mayHide');
            initValidation();
            initData();
        }
    };

}();

jQuery(document).ready(function () {
    Update.init();
});