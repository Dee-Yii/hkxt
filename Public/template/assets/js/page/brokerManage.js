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
            this.initOrgList();
            this.fnGetList({},true);
        },
        bindEvents: function () {
            this.onSearch();
            this.onAdd();
            this.onDel();
            this.onUpdateUserStatus();
            this.onCheck();
        },

        initOrgList: function () {
            var oSelect = $("select[name=org]");
            var optionStr = "";
            var data = {
                pageNum: '',
                page: ''
            };
            accountAPI.getOrgList(data, function (result) {
                console.log('机构列表-调用成功');
                $.each(result.list, function (i, v) {
                    optionStr += '<option value="'+v.memberid+'">'+v.name+'</option>'
                });
                oSelect.html(optionStr);
            });
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
            var _this = this;
            var btn = $(".addBrokerModal .remodal-confirm");
            var oForm = $(".addBrokerModal form");
            btn.on("click", function () {
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    memberid: oForm.find('select').val(),
                    uid: oForm.find('[name=id]').val(),
                    nickname: oForm.find('[name=name]').val(),
                    phone: oForm.find('[name=phone]').val()
                };
                accountAPI.addBroker(data,function (result) {
                    if(result.code==0){
                        addBrokerModal.close();
                        layer.msg("新建成功");
                        _this.fnGetList({},true);
                    }else{
                        layer.msg("新建失败");
                    }
                    $this.removeClass("disabled");
                });
            })
        },
        /**
         * 审核经纪人
         */
        onCheck: function () {
            var _this = this;
            var btn = $(".checkBrokerModal .remodal-confirm");
            var oForm = $(".checkBrokerModal form");
            btn.on("click", function () {
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    id: userId,
                    memberid: oForm.find('select').val(),
                    uid: oForm.find('[name=username]').val(),
                    password: oForm.find('[name=password]').val(),
                    nickname: oForm.find('[name=nickname]').val()
                };
                accountAPI.checkBroker(data,function (result) {
                    if(result.code==0){
                        addUserModal.close();
                        layer.msg("新建成功");
                        _this.fnGetList({},true);
                    }else{
                        layer.msg("新建失败");
                    }
                    $this.removeClass("disabled");
                });
            })
        },

        /**
         * 删除
         */
        onDel: function () {
            var _this = this;
            $(".J_onDel").on("click", function () {
                var selectArr = utils.getCheckedArr();
                if(!selectArr.length){
                    layer.msg("请选择要操作的数据");
                    return;
                }
                var data={
                    id: selectArr
                };
                accountAPI.delBroker(data,function (result) {
                    if(result.code == 0){
                        layer.msg("删除成功");
                        _this.fnGetList({}, true);
                    } else{
                        layer.msg("删除失败");
                    }

                })
            })
        },

        /**
         * 启用/禁用
         */
        onUpdateUserStatus: function () {
            var _this = this;
            $(".J_updateStatus").on("click", function () {
                var idArr = utils.getCheckedArr();
                if(!idArr.length){
                    layer.msg("请选择要操作的数据");
                    return;
                }
                var data={
                    id: idArr,
                    status: $(this).hasClass('open-i') ? 0 : 1
                };

                accountAPI.updateBrokerStatus(data,function (result) {
                    var text = data.status === 0 ? '启用成功' : '禁用成功';
                    if(result.code == 0){
                        layer.msg(text);
                        _this.fnGetList({}, true);
                    } else{
                        layer.msg("操作失败");
                    }
                })
            })

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
                    oTr += '<tr class="fadeIn animated" data-id="'+v.code+'">' + checkTd + codeTd + nameTd + typeTd + orgTd  + phoneTd + statusTd + checkStatusTd + controlTd + '</tr>';
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
