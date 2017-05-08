define([
    "jquery",
    "utils",
    "config",
    "clientAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config, clientAPI) {
    var body = $("body");

    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },
        render: function () {
            this.initGoodsList();
            utils.initDatePicker();
            // this.fnGetList({},true);
        },
        bindEvents: function () {
            this.onSearch();
        },
        initGoodsList: function () {
            var oSelect = $("select[name=goodsName]");
            var optionStr = '<option value="">商品名称</option>';
            var data = {
                pageNum: '',
                page: ''
            };
            clientAPI.getGoodsList(data, function (result) {
                console.log('商品列表 调用成功！');
                $.each(result, function (i, v) {
                    optionStr += '<option value="' + v.id + '">' + v.name + '</option>';
                });
                oSelect.html(optionStr);
            });
        },

        onSearch: function () {
            var _this = this;
            $(".J_search").on("click", function () {
                var oForm = $(".search-bar");
                var data = {
                    page: 1,
                    type: oForm.find("input[name=type]").val(),
                    superMemberid: oForm.find("input[name=level]").val(),
                    name: oForm.find("input[name=orgName]").val() || ""
                };
                _this.fnGetList(data, true);
            });

        },

        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            clientAPI.getCCList(data, function (result) {
                console.log("获取持仓列表 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='5'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr;
                $.each(result.list, function (i, value) {
                    var timeTd = '<td>' + value.code_id + '</td>';
                    var codeTd = '<td>' + value + '</td>';
                    var tradeTypeTd = '<td>' + config.tradeType[value.phone] + '</td>';
                    var amountTd = '<td>' + config.upLevel[value.upLevel] + '</td>';
                    var clientNameTd = '<td>' + config.upLevel[value.upLevel] + '</td>';
                    oTr += '<tr class="fadeIn animated">' + timeTd + codeTd + tradeTypeTd + amountTd + clientNameTd + '</tr>';
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
