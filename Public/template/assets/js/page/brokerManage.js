define([
    "jquery",
    "utils",
    "config",
    "accountAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config,accountAPI) {
    var addBrokerModal = $('[data-remodal-id=addBrokerModal]').remodal();
    var checkBrokerModal = $('[data-remodal-id=checkBrokerModal]').remodal();
    var body = $("body");
    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },
        render: function () {
            this.initModal();
            this.fnGetList({},true);
        },
        bindEvents: function () {
            this.onSearch();
            this.onSelectAll();
            this.onAdd();
        },
        initModal: function () {
            $(".J_showAdd").on("click", function () {
                addBrokerModal.open();
            });
            body.on("click", ".J_showCheckBroker", function () {
                var $this = $(this);
                var oTd = $this.parents('tr').find('td');
                var orgName = oTd.eq(4).text();
                var brokerId = oTd.eq(1).text();
                var brokerName = oTd.eq(2).text();
                var phone = oTd.eq(5).text();
                var oForm = $(".checkBrokerModal .modalForm");
                oForm.find("input[name=orgName]").val(orgName);
                oForm.find("input[name=id]").val(brokerId);
                oForm.find("input[name=name]").val(brokerName);
                oForm.find("input[name=phone]").val(phone);
                checkBrokerModal.open();
            });
            $(document).on('closed', '.remodal', function (e) {
                $(this).find(".modalForm")[0].reset();
            });
        },

        onSearch: function () {
            var _this = this;
            $(".J_search").on("click", function () {
                var type            = $("input[name=roleType]").val(),
                    memberInfo      = $("input[name=orgName]").val(),
                    nickname        = $("input[name=nickname]").val(),
                    phone           = $("input[name=phone]").val();
                var data = {
                    page        : 1,
                    type        : type,
                    memberInfo  : memberInfo,
                    nickname    : nickname,
                    phone       : phone
                };

                _this.fnGetList(data,true);

            });
        },

        onAdd: function () {

        },
        onSelectAll: function () {
            utils.selectAll();
        },
        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            // showLoading(".J_consumeTable");
            accountAPI.searchBroker(data, function (result) {
                console.log("获取经纪人列表 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='9'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr,
                    checkTd = '<td><input type="checkbox"></td>',
                    controlTd = "<td>" +
                        "<a class='J_showCheckBroker text-blue' href='javascript:;'> 审核 </a>" +
                        "</td>";
                $.each(result.list, function (i, v) {
                    var codeTd      = '<td>' + v.code + '</td>';
                    var nameTd      = '<td>' + v.nickname + '</td>';
                    var typeTd      = '<td>' + config.roleType[v.type] + '</td>'; // 角色类型
                    var orgTd       = '<td>' + (v.memberInfo ? v.memberInfo.name : "" )+ '</td>';
                    var phoneTd     = '<td>' + v.phone + '</td>';
                    var statusTd    = '<td>' + config.brokerStatus[v.status] + '</td>';
                    var checkStatusTd    = '<td>' + config.brokerCheckStatus[v.verify] + '</td>';
                    oTr += '<tr class="fadeIn animated">' + checkTd + codeTd + nameTd + typeTd + orgTd  + phoneTd + statusTd + checkStatusTd + controlTd + '</tr>';
                });
                table.find("tbody").empty().html(oTr);

                if (initPage) {
                    var pageCount = result.totalPages;
                    if (pageCount > 0) {
                        console.log("页数：" + pageCount);
                        $(".pagination").show().html("").createPage({
                            pageCount: pageCount,
                            current: 1,
                            backFn: function (p) {
                                var newData = data;
                                newData.page = p;
                                _this.fnGetList(data)
                            }
                        })
                    }
                }
            });

        }

    };
    page.init();

});
