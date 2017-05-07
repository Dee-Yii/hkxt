define([
    "jquery",
    "utils",
    "config",
    "clientAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config, clientAPI) {
    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },
        render: function () {
            utils.initDatePicker();
            utils.initClientInfo();
            this.fnGetList({uid: utils.getQuery('uid')}, true);
        },
        bindEvents: function () {
            this.onSearch();
        },

        onSearch: function () {

        },
        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            clientAPI.getOutMoneyList(data, function (result) {
                console.log("获取出金记录 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='6'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr;
                $.each(result.list, function (i, v) {
                    var timeTd = '<td>' + v.withdrawTime + '</td>';
                    var idTd = '<td>' + v.wid + '</td>';
                    var moneyTd = '<td>' + v.money + '</td>';
                    var chargeTd = '<td>' + v.charge + '</td>';
                    var statusTd = '<td>' + config.outStatus[v.status] + '</td>';
                    var infoTd = '<td></td>';
                    oTr +=
                        '<tr class="fadeIn animated">'
                        + timeTd + idTd + chargeTd + moneyTd + statusTd + infoTd +
                        '</tr>';
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


            //***************
            var result ={
                    "totalPages": 7,
                    "pageNum": 5,
                    "page": 1,
                    "list": [
                        {
                            "id": "26",
                            "uid": "5",
                            "wid": "1480558557791008503",
                            "money": "1",
                            "charge": "0",
                            "accountId": "9",
                            "withdrawTime": "2017-04-10 13:02:11",
                            "status": "0",
                            "handleTime": "2017-04-10 13:02:11",
                            "comment": ""
                        },
                        {
                            "id": "27",
                            "uid": "5",
                            "wid": "4372933036150072287",
                            "money": "1",
                            "charge": "0",
                            "accountId": "9",
                            "withdrawTime": "2017-04-10 13:35:47",
                            "status": "0",
                            "handleTime": "2017-04-10 13:35:47",
                            "comment": ""
                        },
                        {
                            "id": "28",
                            "uid": "5",
                            "wid": "3087023738372092712",
                            "money": "10",
                            "charge": "0",
                            "accountId": "9",
                            "withdrawTime": "2017-04-10 13:38:06",
                            "status": "0",
                            "handleTime": "2017-04-10 13:38:06",
                            "comment": ""
                        },
                        {
                            "id": "29",
                            "uid": "5",
                            "wid": "8387953495760125478",
                            "money": "10",
                            "charge": "0",
                            "accountId": "9",
                            "withdrawTime": "2017-04-10 14:03:23",
                            "status": "0",
                            "handleTime": "2017-04-10 14:03:23",
                            "comment": ""
                        },
                        {
                            "id": "30",
                            "uid": "5",
                            "wid": "270150956623097506",
                            "money": "10",
                            "charge": "0",
                            "accountId": "9",
                            "withdrawTime": "2017-04-10 14:03:45",
                            "status": "0",
                            "handleTime": "2017-04-10 14:03:45",
                            "comment": ""
                        }
                    ]
                };
            console.log("获取出金记录 调用成功!");
            if (result.list.length == "0") {
                table.find("tbody").empty().html("<tr><td colspan='6'>暂无记录</td></tr>");
                $(".pagination").hide();
                return false;
            }
            var oTr;
            $.each(result.list, function (i, v) {
                var timeTd = '<td>' + v.withdrawTime + '</td>';
                var idTd = '<td>' + v.wid + '</td>';
                var moneyTd = '<td>' + v.money + '</td>';
                var chargeTd = '<td>' + v.charge + '</td>';

                var statusTd = '<td>' + config.outStatus[v.status] + '</td>';
                var infoTd = '<td></td>';
                oTr +=
                    '<tr class="fadeIn animated">'
                    + timeTd + idTd + chargeTd + moneyTd + statusTd + infoTd +
                    '</tr>';
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
            //***************
        }

    };
    page.init();

});
