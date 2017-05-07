define([
    "jquery",
    "utils",
    "config",
    "countAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config, countAPI) {
    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },
        render: function () {
            utils.initDatePicker();
            utils.initClientInfo();
            this.fnGetList({pageNum:10}, true);
        },
        bindEvents: function () {
            this.onSearch();
        },

        onSearch: function () {
            var _this = this;
            $(".J_search").on("click", function () {
                var oForm = $(".search-bar");
                var data = {
                    page: 1,
                    start: oForm.find("#dataStart").val(),
                    end: oForm.find("#dataEnd").val(),
                    nickname: oForm.find("[name=nickname]").val(),
                    superMemberid: oForm.find("input[name=level]").val(),
                    name: oForm.find("input[name=orgName]").val() || ""
                };
                _this.fnGetList(data, true);
            });
        },
        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            countAPI.getReport(data, function (result) {
                console.log("获取统计报表 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='6'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr;
                $.each(result.list, function (i, v) {
                    var timeTd = '<td>' + v.close_position_time + '</td>';
                    var usernameTd = '<td>' + (v.userInfo ? v.userInfo.phoneNum : "") + '</td>';
                    var goodsNameTd = '<td>' + (v.actaulInfo ? v.actaulInfo.name : "") + '</td>';
                    var dirTd = '<td>' + (v.buy_sell == -1 ? "卖出" : "买入") + '</td>';
                    var incomeTd = '<td>'+(v.result*v.gross_profit).toFixed(2)+'</td>';
                    oTr +=
                        '<tr class="fadeIn animated">'
                        + timeTd + usernameTd  + goodsNameTd + dirTd + incomeTd +
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


          
        }

    };
    page.init();

});
