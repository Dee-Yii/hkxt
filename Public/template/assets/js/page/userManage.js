define([
    "jquery",
    "utils",
    "config",
    "accountAPI",
    "layer",
    "pagination",
    "remodal"
], function ($, utils, config, accountAPI) {
    var addUserModal = $('[data-remodal-id=addUserModal]').remodal();
    var changeUserModal = $('[data-remodal-id=changeUserModal]').remodal();
    var resetPwdModal = $('[data-remodal-id=resetPwdModal]').remodal();
    var body = $("body");
    var userId;

    var page = {
        init: function () {
            this.render();
            this.bindEvents();
        },
        render: function () {
            this.initModal();
            this.initOrgList();
            this.fnGetList({}, true);
        },
        bindEvents: function () {
            this.onSearch();
            this.onAdd();
            this.onChange();
            this.onDel();
            this.onUpdateUserStatus();
            this.onRestPwd();
        },
        initModal: function () {
            $(".J_showAdd").on("click", function () {
                addUserModal.open();
            });
            body.on("click", ".J_showChangeUser", function () {
                var $this = $(this);
                userId = $this.parents('tr').attr('data-id');
                var oTd = $this.parents('tr').find('td');
                var orgName = oTd.eq(4).text();
                var username = oTd.eq(1).text();
                var nickname = oTd.eq(2).text();
                var roleType = oTd.eq(3).text();
                var oForm = $(".changeUserModal .modalForm");
                oForm.find("input[name=orgName]").val(orgName);
                oForm.find("input[name=username]").val(username);
                oForm.find("input[name=nickname]").val(nickname);
                oForm.find("input[name=roleType]").val(roleType);
                changeUserModal.open();
            });

            body.on("click", ".J_showResetPwd", function () {
                var $this = $(this);
                userId = $this.parents('tr').attr('data-id');
                var oTd = $this.parents('tr').find('td');
                var username = oTd.eq(1).text();
                var nickname = oTd.eq(2).text();
                var oForm = $(".resetPwdModal .modalForm");
                oForm.find("input[name=username]").val(username);
                oForm.find("input[name=nickname]").val(nickname);
                changeUserModal.open();
                resetPwdModal.open();
            });

            $(document).on('closed', '.remodal', function (e) {
                $(this).find(".modalForm")[0].reset();
            });
        },

        /**
         * 初始化 所属机构下拉列表
         */
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
                    optionStr += '<option value="'+v.memberId+'">'+v.name+'</option>'
                });
                oSelect.html(optionStr);
            });



            // *********
        },
        onSearch: function () {

        },

        /**
         * 添加用户
         */
        onAdd: function () {
            var btn = $(".addUserModal .remodal-confirm");
            var oForm = $(".addUserModal form");
            btn.on("click", function () {
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    memeberId: oForm.find('select').val(),
                    uid: oForm.find('[name=username]').val(),
                    password: oForm.find('[name=password]').val(),
                    nickname: oForm.find('[name=nickname]').val(),
                    // role: ''
                };

                // ******
                layer.msg("新建成功");
                addUserModal.close();
                $this.removeClass("disabled");
                // ******

                accountAPI.addOrg(data,function (result) {
                    addUserModal.close();
                    $this.removeClass("disabled");
                    layer.msg("新建成功");
                });
            })
        },

        /**
         * 修改用户
         */
        onChange: function () {
            var btn = $(".changeUserModal .remodal-confirm");
            var oForm = $(".changeUserModal form");
            btn.on("click", function () {
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    id: userId,
                    memeberId: oForm.find('select').val(),
                    uid: oForm.find('[name=username]').val(),
                    password: oForm.find('[name=password]').val(),
                    nickname: oForm.find('[name=nickname]').val(),
                    // role: ''
                };

                // ******
                layer.msg("修改成功");
                changeUserModal.close();
                $this.removeClass("disabled");
                // ******

                accountAPI.changeUser(data,function (result) {
                    changeUserModal.close();
                    $this.removeClass("disabled");
                    layer.msg("修改成功");
                });
            })
        },

        /**
         * 删除用户
         */
        onDel: function () {
            var _this = this;
            $(".J_onDel").on("click", function () {
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
                layer.msg("删除成功");
                _this.fnGetList({}, true);
                // *********

                accountAPI.updateUserStatus(data,function (result) {
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

                accountAPI.updateUserStatus(data,function () {
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

        /**
         * 重置密码
         */
        onRestPwd: function () {
            var btn = $(".resetPwdModal .remodal-confirm");
            var oForm = $(".resetPwdModal form");
            btn.on("click", function () {
                var $this = $(this);
                if ($this.hasClass("disabled")) return;
                $this.addClass("disabled");
                var data = {
                    id: userId,
                    password: oForm.find('[name=password]').val()
                };

                // ******
                layer.msg("重置密码成功");
                resetPwdModal.close();
                $this.removeClass("disabled");
                // ******

                accountAPI.resetPwd(data,function (result) {
                    resetPwdModal.close();
                    $this.removeClass("disabled");
                    layer.msg("重置密码成功");
                });
            });
        },

        fnGetList: function (data, initPage) {
            var _this = this;
            var table = $(".data-container table");
            accountAPI.getUserList(data, function (result) {
                console.log("获取用户管理列表 调用成功!");
                if (result.list.length == "0") {
                    table.find("tbody").empty().html("<tr><td colspan='9'>暂无记录</td></tr>");
                    $(".pagination").hide();
                    return false;
                }
                var oTr,
                    checkTd = '<td><input type="checkbox"></td>',
                    controlTd = "<td>" +
                        "<a class='J_showChangeUser text-blue' href='javascript:;'> 修改 </a> | " +
                        "<a class='J_showResetPwd text-blue' href='javascript:;'> 重置密码 </a>" +
                        "</td>";
                $.each(result.list, function (i, v) {
                    if(v.memberInfo){
                      var name =v.memberInfo.name;
                    }else{
                      var name ="";
                    }
                    var usernameTd = '<td>' + v.uid + '</td>';
                    var nicknameTd = '<td>' + v.nickname + '</td>';
                    var roleTypeTd = '<td>' + config.roleType[v.roleType || 0] + '</td>';
                    var orgTd = '<td>' + (v.memberInfo ? v.memberInfo.name : "") + '</td>';
                    var phoneTd = '<td>' + (v.cellphone?v.cellphone:"") + '</td>';
                    var timeTd = '<td>' + v.registerTime + '</td>';
                    var statusTd = '<td>' + config.userStatus[v.status] + '</td>';
                    oTr += '<tr class="fadeIn animated" data-id="'+v.id+'">' + checkTd + usernameTd + nicknameTd + roleTypeTd + orgTd + phoneTd + timeTd + statusTd + controlTd + '</tr>';
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

            // ***********
            var result = {
                "totalPages": 1,
                "pageNum": 5,
                "page": 1,
                "list": [
                    {
                        "id": "1",
                        "uid": "XA111",
                        "password": "QWEQW",
                        "nickname": "小白",
                        "cellphone": "1111",
                        "registerTime": "2017-05-03",
                        "status": "0",
                        "memberId": "1",
                        "memberInfo": {
                            "memberId": "1",
                            "name": "华东",
                            "type": "0",
                            "superMemberid": null
                        }
                    },
                    {
                        "id": "2",
                        "uid": "qqq",
                        "password": "asdas",
                        "nickname": "暗示的话",
                        "cellphone": "aaa",
                        "registerTime": "2017-05-17",
                        "status": "0",
                        "memberId": "123",
                        "memberInfo": {
                            "memberId": "123",
                            "name": "按时",
                            "type": "0",
                            "superMemberid": "1"
                        }
                    },
                    {
                        "id": "1",
                        "uid": "XA111",
                        "password": "QWEQW",
                        "nickname": "小白",
                        "cellphone": "1111",
                        "registerTime": "2017-05-03",
                        "status": "0",
                        "memberId": "1",
                        "memberInfo": {
                            "memberId": "1",
                            "name": "华东",
                            "type": "0",
                            "superMemberid": null
                        }
                    },
                    {
                        "id": "2",
                        "uid": "qqq",
                        "password": "asdas",
                        "nickname": "暗示的话",
                        "cellphone": "aaa",
                        "registerTime": "2017-05-17",
                        "status": "0",
                        "memberId": "123",
                        "memberInfo": {
                            "memberId": "123",
                            "name": "按时",
                            "type": "0",
                            "superMemberid": "1"
                        }
                    },
                    {
                        "id": "1",
                        "uid": "XA111",
                        "password": "QWEQW",
                        "nickname": "小白",
                        "cellphone": "1111",
                        "registerTime": "2017-05-03",
                        "status": "0",
                        "memberId": "1",
                        "memberInfo": {
                            "memberId": "1",
                            "name": "华东",
                            "type": "0",
                            "superMemberid": null
                        }
                    },
                    {
                        "id": "2",
                        "uid": "qqq",
                        "password": "asdas",
                        "nickname": "暗示的话",
                        "cellphone": "aaa",
                        "registerTime": "2017-05-17",
                        "status": "0",
                        "memberId": "123",
                        "memberInfo": {
                            "memberId": "123",
                            "name": "按时",
                            "type": "0",
                            "superMemberid": "1"
                        }
                    },
                    {
                        "id": "1",
                        "uid": "XA111",
                        "password": "QWEQW",
                        "nickname": "小白",
                        "cellphone": "1111",
                        "registerTime": "2017-05-03",
                        "status": "0",
                        "memberId": "1",
                        "memberInfo": {
                            "memberId": "1",
                            "name": "华东",
                            "type": "0",
                            "superMemberid": null
                        }
                    },
                    {
                        "id": "2",
                        "uid": "qqq",
                        "password": "asdas",
                        "nickname": "暗示的话",
                        "cellphone": "aaa",
                        "registerTime": "2017-05-17",
                        "status": "0",
                        "memberId": "123",
                        "memberInfo": {
                            "memberId": "123",
                            "name": "按时",
                            "type": "0",
                            "superMemberid": "1"
                        }
                    },
                    {
                        "id": "1",
                        "uid": "XA111",
                        "password": "QWEQW",
                        "nickname": "小白",
                        "cellphone": "1111",
                        "registerTime": "2017-05-03",
                        "status": "0",
                        "memberId": "1",
                        "memberInfo": {
                            "memberId": "1",
                            "name": "华东",
                            "type": "0",
                            "superMemberid": null
                        }
                    },
                    {
                        "id": "2",
                        "uid": "qqq",
                        "password": "asdas",
                        "nickname": "暗示的话",
                        "cellphone": "aaa",
                        "registerTime": "2017-05-17",
                        "status": "0",
                        "memberId": "123",
                        "memberInfo": {
                            "memberId": "123",
                            "name": "按时",
                            "type": "0",
                            "superMemberid": "1"
                        }
                    }
                ]
            };
            console.log("获取用户管理列表 调用成功!");
            if (result.list.length == "0") {
                table.find("tbody").empty().html("<tr><td colspan='9'>暂无记录</td></tr>");
                $(".pagination").hide();
                return false;
            }
            var oTr,
                checkTd = '<td><input type="checkbox"></td>',
                controlTd = "<td>" +
                    "<a class='J_showChangeUser text-blue' href='javascript:;'> 修改 </a> | " +
                    "<a class='J_showResetPwd text-blue' href='javascript:;'> 重置密码 </a>" +
                    "</td>";
            $.each(result.list, function (i, v) {
                var usernameTd = '<td>' + v.uid + '</td>';
                var nicknameTd = '<td>' + v.nickname + '</td>';
                var roleTypeTd = '<td>' + config.roleType[v.roleType || 0] + '</td>';
                var orgTd = '<td>' + v.memberInfo.name + '</td>';
                var phoneTd = '<td>' + v.cellphone + '</td>';
                var timeTd = '<td>' + v.registerTime + '</td>';
                var statusTd = '<td>' + config.userStatus[v.status] + '</td>';
                oTr += '<tr class="fadeIn animated" data-id="'+v.id+'">' + checkTd + usernameTd + nicknameTd + roleTypeTd + orgTd + phoneTd + timeTd + statusTd + controlTd + '</tr>';
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
            // ***********
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
