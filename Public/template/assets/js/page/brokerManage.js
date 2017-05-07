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
                /*var result = {
                    "totalPages": 91,
                    "pageNum": 5,
                    "page": 1,
                    "list": [
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "141474220113067346",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003017",
                            "close_position_time": "1490003077",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.06111",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "-1",
                            "handle": "0"
                        },
                        {
                            "tid": "7418135986911958157",
                            "uid": "5",
                            "code_id": "12",
                            "buy_sell": "-1",
                            "code": null,
                            "symbol": "fx_sjpycnh",
                            "name": "\u4e0a\u6d77-\u4e1c\u4eac1\u5206\u949f",
                            "close_type": "6",
                            "amount": "3",
                            "open_position_time": "1490003025",
                            "close_position_time": "1490003085",
                            "gross_profit": "33.4023",
                            "open_price": "0.06111",
                            "open_cost": "33.4023",
                            "open_charge": "0.15",
                            "close_price": "0.061104",
                            "pos_limit": "0",
                            "stop": "0",
                            "deferred": "0",
                            "is_deferred": null,
                            "result": "1",
                            "handle": "0"
                        }]
                };*/
                console.log("获取用户管理列表 调用成功!");
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
                    var orgTd       = '<td>' + v.memberInfo.name + '</td>';
                    var phoneTd     = '<td>' + v.phone + '</td>';
                    var statusTd    = '<td>' + config.orgStatus[v.status] + '</td>';
                    oTr += '<tr class="fadeIn animated">' + checkTd + codeTd + nameTd + typeTd + orgTd  + phoneTd + statusTd + controlTd + '</tr>';
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
