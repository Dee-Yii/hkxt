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
            clientAPI.getYPCList(data, function (result) {
                console.log("获取平仓列表 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='9'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr;
                $.each(result.list, function (i, v) {
                    var timeTd = '<td>' + v.close_position_time + '</td>';
                    var idTd = '<td>' + v.tid + '</td>';
                    var goodsNameTd = '<td>' + (v.actaulInfo ? v.actaulInfo.name : "") + '</td>';
                    var goodsSizeTd = '<td>' + (v.actaulInfo ? v.actaulInfo.unit : "") + '</td>';
                    var dirTd = '<td>' + (v.buy_sell == -1 ? "卖出" : "买入") + '</td>';
                    var oprTd = '<td>' + (v.buy_sell == -1 ? "买跌" : "买涨") + '</td>';
                    var amountTd = '<td>' + v.amount + '</td>';
                    var ykTd = '<td>' + (v.result * v.gross_profit).toFixed(2) + '</td>';
                    var infoTd = '<td></td>';
                    oTr +=
                        '<tr class="fadeIn animated">'
                        + timeTd + idTd + goodsNameTd + goodsSizeTd + dirTd + oprTd + amountTd + ykTd + infoTd +
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
            var result = {
                "totalPages": 150,
                "pageNum": 5,
                "page": 1,
                "list": [
                    {
                        "tid": "1757850905579034113",
                        "uid": "5",
                        "code_id": "11",
                        "buy_sell": "-1",
                        "code": null,
                        "symbol": "fx_susdcnh",
                        "name": "上海-纽约1分钟",
                        "close_type": "6",
                        "amount": "50",
                        "open_position_time": "1493883365",
                        "close_position_time": "1493883425",
                        "gross_profit": "776.786",
                        "open_price": "6.8971",
                        "open_cost": "776.786",
                        "open_charge": "0.15",
                        "close_price": "6.8969",
                        "pos_limit": "0",
                        "stop": "0",
                        "deferred": "0",
                        "is_deferred": null,
                        "result": "1",
                        "handle": "1",
                        "actaulInfo": {
                            "id": "1",
                            "code": "AG100G",
                            "name": "0.1kg白银",
                            "symbol": "AG",
                            "unit": "0.1kg",
                            "amount": "0.1",
                            "profit": "0.1",
                            "deposit": "8",
                            "open": "0.7",
                            "close": "0",
                            "deferred": "0.1",
                            "max": "30",
                            "min": " 1",
                            "exchange_name": "DEFAULT",
                            "platform_name": "JH",
                            "status": "1",
                            "sort": "1",
                            "show_symbol": "白银",
                            "show_name": "0.1kg"
                        }
                    },
                    {
                        "tid": "1674807288714476621",
                        "uid": "5",
                        "code_id": "12",
                        "buy_sell": "-1",
                        "code": null,
                        "symbol": "fx_sjpycnh",
                        "name": "上海-东京1分钟",
                        "close_type": "6",
                        "amount": "50",
                        "open_position_time": "1493883340",
                        "close_position_time": "1493883400",
                        "gross_profit": "556.486",
                        "open_price": "0.061086",
                        "open_cost": "556.486",
                        "open_charge": "0.15",
                        "close_price": "0.061086",
                        "pos_limit": "0",
                        "stop": "0",
                        "deferred": "0",
                        "is_deferred": null,
                        "result": "-1",
                        "handle": "0",
                        "actaulInfo": {
                            "id": "1",
                            "code": "AG100G",
                            "name": "0.1kg白银",
                            "symbol": "AG",
                            "unit": "0.1kg",
                            "amount": "0.1",
                            "profit": "0.1",
                            "deposit": "8",
                            "open": "0.7",
                            "close": "0",
                            "deferred": "0.1",
                            "max": "30",
                            "min": " 1",
                            "exchange_name": "DEFAULT",
                            "platform_name": "JH",
                            "status": "1",
                            "sort": "1",
                            "show_symbol": "白银",
                            "show_name": "0.1kg"
                        }
                    },
                    {
                        "tid": "3642050484610273488",
                        "uid": "5",
                        "code_id": "12",
                        "buy_sell": "1",
                        "code": null,
                        "symbol": "fx_sjpycnh",
                        "name": "上海-东京1分钟",
                        "close_type": "6",
                        "amount": "50",
                        "open_position_time": "1493883324",
                        "close_position_time": "1493883384",
                        "gross_profit": "556.486",
                        "open_price": "0.061086",
                        "open_cost": "556.486",
                        "open_charge": "0.15",
                        "close_price": "0.061086",
                        "pos_limit": "0",
                        "stop": "0",
                        "deferred": "0",
                        "is_deferred": null,
                        "result": "-1",
                        "handle": "0",
                        "actaulInfo": {
                            "id": "1",
                            "code": "AG100G",
                            "name": "0.1kg白银",
                            "symbol": "AG",
                            "unit": "0.1kg",
                            "amount": "0.1",
                            "profit": "0.1",
                            "deposit": "8",
                            "open": "0.7",
                            "close": "0",
                            "deferred": "0.1",
                            "max": "30",
                            "min": " 1",
                            "exchange_name": "DEFAULT",
                            "platform_name": "JH",
                            "status": "1",
                            "sort": "1",
                            "show_symbol": "白银",
                            "show_name": "0.1kg"
                        }
                    },
                    {
                        "tid": "8791282959331912359",
                        "uid": "5",
                        "code_id": "10",
                        "buy_sell": "-1",
                        "code": null,
                        "symbol": "fx_seurcnh",
                        "name": "上海-法兰克福1分钟",
                        "close_type": "6",
                        "amount": "1",
                        "open_position_time": "1493882924",
                        "close_position_time": "1493882984",
                        "gross_profit": "12.7015",
                        "open_price": "7.509",
                        "open_cost": "12.7015",
                        "open_charge": "0.15",
                        "close_price": "7.509",
                        "pos_limit": "0",
                        "stop": "0",
                        "deferred": "0",
                        "is_deferred": null,
                        "result": "-1",
                        "handle": "0",
                        "actaulInfo": {
                            "id": "1",
                            "code": "AG100G",
                            "name": "0.1kg白银",
                            "symbol": "AG",
                            "unit": "0.1kg",
                            "amount": "0.1",
                            "profit": "0.1",
                            "deposit": "8",
                            "open": "0.7",
                            "close": "0",
                            "deferred": "0.1",
                            "max": "30",
                            "min": " 1",
                            "exchange_name": "DEFAULT",
                            "platform_name": "JH",
                            "status": "1",
                            "sort": "1",
                            "show_symbol": "白银",
                            "show_name": "0.1kg"
                        }
                    },
                    {
                        "tid": "3450102723273383353",
                        "uid": "5",
                        "code_id": "10",
                        "buy_sell": "-1",
                        "code": null,
                        "symbol": "fx_seurcnh",
                        "name": "上海-法兰克福1分钟",
                        "close_type": "6",
                        "amount": "50",
                        "open_position_time": "1493882909",
                        "close_position_time": "1493882969",
                        "gross_profit": "634.989",
                        "open_price": "7.508",
                        "open_cost": "634.989",
                        "open_charge": "0.15",
                        "close_price": "7.509",
                        "pos_limit": "0",
                        "stop": "0",
                        "deferred": "0",
                        "is_deferred": null,
                        "result": "-1",
                        "handle": "0",
                        "actaulInfo": {
                            "id": "1",
                            "code": "AG100G",
                            "name": "0.1kg白银",
                            "symbol": "AG",
                            "unit": "0.1kg",
                            "amount": "0.1",
                            "profit": "0.1",
                            "deposit": "8",
                            "open": "0.7",
                            "close": "0",
                            "deferred": "0.1",
                            "max": "30",
                            "min": " 1",
                            "exchange_name": "DEFAULT",
                            "platform_name": "JH",
                            "status": "1",
                            "sort": "1",
                            "show_symbol": "白银",
                            "show_name": "0.1kg"
                        }
                    }
                ]
            };
            console.log("获取平仓列表 调用成功!");
            if (result.list.length == "0") {
                table.find("tbody").empty().html("<tr><td colspan='7'>暂无记录</td></tr>");
                $(".pagination").hide();
                return false;
            }
            var oTr;
            $.each(result.list, function (i, v) {
                var timeTd = '<td>' + v.close_position_time + '</td>';
                var idTd = '<td>' + v.tid + '</td>';
                var goodsNameTd = '<td>' + (v.actaulInfo ? v.actaulInfo.name : "") + '</td>';
                var goodsSizeTd = '<td>' + (v.actaulInfo ? v.actaulInfo.unit : "") + '</td>';
                var dirTd = '<td>' + (v.buy_sell == -1 ? "卖出" : "买入") + '</td>';
                var oprTd = '<td>' + (v.buy_sell == -1 ? "买跌" : "买涨") + '</td>';
                var amountTd = '<td>' + v.amount + '</td>';
                var ykTd = '<td>' + (v.result * v.gross_profit).toFixed(2) + '</td>';
                var infoTd = '<td></td>';
                oTr +=
                    '<tr class="fadeIn animated">'
                    + timeTd + idTd + goodsNameTd + goodsSizeTd + dirTd + oprTd + amountTd + ykTd + infoTd +
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
