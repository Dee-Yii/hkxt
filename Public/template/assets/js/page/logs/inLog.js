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
            clientAPI.getInMoneyList(data, function (result) {
                console.log("获取入金记录 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='6'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr;
                $.each(result.list, function (i, v) {
                    var timeTd = '<td>' + v.depositTime + '</td>';
                    var idTd = '<td>' + v.rid + '</td>';
                    var moneyTd = '<td>' + v.amount + '</td>';
                    var statusTd = '<td>' + config.inStatus[v.status] + '</td>';
                    var infoTd = '<td></td>';
                    oTr +=
                        '<tr class="fadeIn animated">'
                        + timeTd + idTd  + moneyTd + statusTd + infoTd +
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
                "totalPages": 71,
                "pageNum": 5,
                "page": 1,
                "list": [
                    {
                        "id": "491",
                        "rid": "8756525393713343104",
                        "uid": "5",
                        "amount": "1",
                        "depositTime": "2017-05-04 15:29:22",
                        "depositType": "1",
                        "status": "3",
                        "transaction_id": "20170504-ROKX9349872VRXE"
                    },
                    {
                        "id": "485",
                        "rid": "394763410023799914",
                        "uid": "5",
                        "amount": "1000",
                        "depositTime": "2017-05-04 14:10:17",
                        "depositType": "1",
                        "status": "0",
                        "transaction_id": null
                    },
                    {
                        "id": "484",
                        "rid": "2091664057305268059",
                        "uid": "5",
                        "amount": "1000",
                        "depositTime": "2017-05-04 14:10:00",
                        "depositType": "1",
                        "status": "0",
                        "transaction_id": null
                    },
                    {
                        "id": "483",
                        "rid": "1515206689636935280",
                        "uid": "5",
                        "amount": "1000",
                        "depositTime": "2017-05-04 14:08:39",
                        "depositType": "1",
                        "status": "0",
                        "transaction_id": null
                    },
                    {
                        "id": "481",
                        "rid": "1427297742030027441",
                        "uid": "5",
                        "amount": "1",
                        "depositTime": "2017-05-04 14:07:09",
                        "depositType": "1",
                        "status": "0",
                        "transaction_id": null
                    }
                ]
            };
            console.log("获取入金记录 调用成功!");
            if (result.list.length == "0") {
                table.find("tbody").empty().html("<tr><td colspan='6'>暂无记录</td></tr>");
                $(".pagination").hide();
                return false;
            }
            var oTr;
            $.each(result.list, function (i, v) {
                var timeTd = '<td>' + v.depositTime + '</td>';
                var idTd = '<td>' + v.rid + '</td>';
                var moneyTd = '<td>' + v.amount + '</td>';
                var statusTd = '<td>' + config.inStatus[v.status] + '</td>';
                var infoTd = '<td></td>';
                oTr +=
                    '<tr class="fadeIn animated">'
                    + timeTd + idTd  + moneyTd + statusTd + infoTd +
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
