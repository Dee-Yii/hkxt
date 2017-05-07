define([
    "jquery",
    "utils",
    "config",
    "accountAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config, accountAPI) {
    var addOrgModal = $('[data-remodal-id=addOrgModal]').remodal();
    var changeOrgModal = $('[data-remodal-id=changeOrgModal]').remodal();
    var oInput = $(".data-container table tbody input[type=checkbox]:checked");
    var userId;


    var body = $("body");
    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },

        render: function () {
            this.initModal();
            this.fnGetList({},true);
            this.initTopOrgList();
        },

        bindEvents: function () {
            // this.onSelectAll();
            this.onAdd();
            this.onOpen();
            this.onClose();
            this.onDel();
            this.onChange();
            this.onSearch();
        },

        initModal: function () {
            $(".J_showAdd").on("click", function () {
                addOrgModal.open();
            });
            body.on("click", ".J_showChangeOrg", function () {
                var $this = $(this);
                var oTd = $this.parents('tr').find('td');
                var id = oTd.eq(1).text();
                var name = oTd.eq(2).text();
                var type = oTd.eq(3).text();
                var upLevel = oTd.eq(4).text();
                var phone = oTd.eq(5).text();
                var cellphone = oTd.eq(6).text();
                var oForm = $(".changeOrgModal .modalForm");
                oForm.find("input[name=orgId]").val(id);
                oForm.find("input[name=orgName]").val(name);
                oForm.find("input[name=orgLevel]").val(name);
                oForm.find("input[name=orgType]").val(name);
                oForm.find("input[name=phone]").val(phone);
                oForm.find("input[name=cellphone]").val(cellphone);
                changeOrgModal.open();
            });

            $(document).on('closed', '.remodal', function (e) {
                $(this).find(".modalForm")[0].reset();
            });
        },

        initTopOrgList: function () {
            var oSelect = $("select[name=orgTopLevel]");
            var optionStr = "";
            var data = {
                pageNum: '',
                page: ''
            };
            accountAPI.getTopOrgList(data, function (result) {
                console.log('一级机构列表-调用成功');
                $.each(result, function (i, v) {
                    optionStr += '<option value="'+v.memberid+'">'+v.name+'</option>'
                });
                oSelect.html(optionStr);
            });
        },

        onAdd: function () {
            var confirmBtn = $(".addOrgModal .remodal-confirm");
            var oForm = $(".addOrgModal form");

            var orgLevelSelect = oForm.find('[name=orgLevel]');
            var orgTop = oForm.find('.J_topOrg');
            orgLevelSelect.on('change', function () {
                var $this = $(this);
                if($this.val() == 0){
                    orgTop.hide();
                }else{
                    orgTop.show();
                }
            });

            confirmBtn.on("click", function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    name: oForm.find('[name=orgName]').val(),
                    mark: oForm.find('[name=orgCode]').val(),
                    superMemberid: orgLevelSelect.val() == 0 ? 0 : oForm.find('[name=orgTopLevel]').val(),
                    type: oForm.find('[name=orgType]').val(),
                    tel: oForm.find('[name=phone]').val(),
                    phone: oForm.find('[name=cellphone]').val()
                };

                // todo Validate
                accountAPI.addOrg(data, function (result) {
                    console.log(result);
                    layer.msg('添加成功');
                    addOrgModal.close();
                    $this.removeClass("disabled");
                })
            })
        },

        /**
         * 启用/禁用用户
         */
        onUpdateUserStatus: function () {
            var _this = this;
            $(".J_updateStatus").on("click", function () {
                var selectArr = _this.fnGetSelect();
                if(!selectArr.length){
                    layer.msg("请选择要操作的数据");
                    return;
                }
                var data={
                    id: selectArr,
                    status: $(this).hasClass('open-i') ? 0 : 1
                };

                // *********
                var text = data.status === 0 ? '启用成功' : '禁用成功';
                _this.fnGetList({}, true);
                layer.msg(text);
                // *********

                accountAPI.updateOrgStatus(data,function () {
                    var text = data.status === 0 ? '启用成功' : '禁用成功';
                    if(result.cade == 0){
                        layer.msg(text);
                        // _this.fnGetList({}, true);
                        oInput.each(function () {
                            $(this).parents("tr").find("td").eq(7).text(config.orgStatus[data.status])
                        })
                    } else{
                        layer.msg("操作失败");
                    }
                })
            })

        },

        onOpen: function () {
            $(".J_showOpen").on("click", function () {
                var idArr = utils.getCheckedArr();
                if (idArr.length > 0) {
                    layer.confirm('确定启用选中的列表项吗？', {icon: 3}, function (index) {
                        accountAPI.openOrg(idArr, function (result) {
                            oInput.each(function () {
                                $(this).parents("tr").find("td").eq(7).text(config.orgStatus[1])
                            })
                        });
                        layer.close(index)
                    });

                } else {
                    layer.alert("请先选择要启用的列表项");
                }
            })
        },

        onClose: function () {
            $(".J_showClose").on("click", function () {
                var idArr = utils.getCheckedArr();
                if (idArr.length > 0) {
                    layer.confirm('确定禁用选中的列表项吗？', {icon: 3}, function (index) {
                        accountAPI.closeOrg(idArr, function (result) {
                            oInput.each(function () {
                                $(this).parents("tr").find("td").eq(7).text(config.orgStatus[2])
                            })
                        });
                        layer.close(index)
                    });
                } else {
                    layer.alert("请先选择要禁用的列表项");
                }
            })
        },

        onDel: function () {
            $(".J_showDel").on("click", function () {
                var idArr = utils.getCheckedArr();
                if (idArr.length > 0) {
                    layer.confirm('确定删除选中的列表项吗？', {icon: 3}, function (index) {
                        accountAPI.delOrg(idArr, function (result) {
                            oInput.each(function () {
                                $(this).parents("tr").remove();
                            })
                        });
                        layer.close(index)
                    });
                } else {
                    layer.alert("请先选择要删除的列表项", {icon: 0});
                }
            })
        },

        onChange: function () {
            $(".changeOrgModal .remodal-confirm").on("click", function () {
                var data = {};
                accountAPI.changeOrg(data, function (result) {
                    layer.msg("修改成功");
                })
            })
        },

        onSearch: function () {
            var _this = this;
            $(".J_search").on("click", function () {
                var type            = $("input[name=type]").val(),
                    superMemberid   = $("input[name=level]").val(),
                    name            = $("input[name=orgName]").val() || "";
                var data = {
                    page            : 1,
                    type            : type,
                    superMemberid   : superMemberid,
                    name            : name
                };

                _this.fnGetList(data,true);

            });
        },

        onSelectAll: function () {
            utils.selectAll();
        },

        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            // showLoading(".J_consumeTable");
            accountAPI.searchOrg(data, function (result) {
                console.log("获取机构管理列表 调用成功!");
                if (!result.list || result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='10'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr,
                    checkTd     = '<td><input type="checkbox"></td>',
                    controlTd = "<td><a class='J_showChangeOrg text-blue' href='javascript:;'>修改</a></td>";
                $.each(result.list, function (i, v) {
                    var codeTd      = '<td>' + v.mark + '</td>';
                    var orgNameTd   = '<td>' + v.name + '</td>';
                    var orgTypeTd   = '<td>' + config.orgType[v.type] + '</td>';
                    var upLevelTd   = '<td>' + v.superMemberInfo + '</td>';
                    var phoneTd     = '<td>' + v.tel + '</td>';
                    var cellphoneTd = '<td>' + v.phone + '</td>';
                    var statusTd    = '<td>' + config.status[v.status] + '</td>';
                    oTr += '<tr class="fadeIn animated" data-id="'+v.id+'">' + checkTd + codeTd + orgNameTd + orgTypeTd + upLevelTd + phoneTd + cellphoneTd + statusTd + controlTd + '</tr>';
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
            

        },
        fnGetSelect: function () {
            var arr = [];
            $(".data-container table tbody tr").each(function () {
                var $this = $(this);
                if($this.find("input[type=checkbox]").prop("checked")){
                    arr.push($this.attr('data-id'));
                }
            });
            return arr;
        }
    };
    page.init();
});
