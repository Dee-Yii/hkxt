/**
 * Created by DAY on 2017/4/15.
 */

define(["jquery"], function ($) {
    var accountAPI = {
        /**
         * 机构管理-获取所有机构列表 (添加用户时渲染所属机构 下拉列表)
         */
         baseRequestUrl:"../",

        getOrgList: function (data,cb) {
            $.post(this.baseRequestUrl+"/member/getList",data,function (result) {
                cb(result);
            })
        },
        /**
         * 机构管理-新建机构
         */
        addOrg: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/addUser",data,function (result) {
                cb(result);
            })
        },
        /**
         * 机构管理-删除
         */
        delOrg: function (data,cb) {
            $.post(this.baseRequestUrl+"/delOrg.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 机构管理-修改
         */
        changeOrg: function (data,cb) {
            $.post(this.baseRequestUrl+"/changeOrg.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-启用
         */
        updateOrgStatus: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/updateStatus",data,function (result) {
                cb(result);
            })
        },

        /**
         * 机构管理-查询
         */
        searchOrg: function (data,cb) {
            data.pageNum = 10;
            $.post(this.baseRequestUrl+"/member/getList",data,function (result) {
                cb(result);
            })
        },



        /**
         * 用户管理-新建机构
         */
        addUser: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/addUser",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-删除
         */
        delUser: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/delUser",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-修改
         */
        changeUser: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/updateUser",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-重置密码
         */
        resetPwd: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/resetPassword",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-启用
         */
        updateUserStatus: function (data,cb) {
            $.post(this.baseRequestUrl+"/adminuser/updateStatus",data,function (result) {
                cb(result);
            })
        },
        /**
         * 用户管理-查询
         */
        getUserList: function (data,cb) {
            data.pageNum = 10;
            $.post(this.baseRequestUrl+"/adminuser/getList",data,function (result) {
                cb(result);
            })
        },


        /**
         * 经纪人管理-新建机构
         */
        addBroker: function (data,cb) {
            $.post(this.baseRequestUrl+"/addUser.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 经纪人管理-删除
         */
        delBroker: function (data,cb) {
            $.post(this.baseRequestUrl+"/delBroker.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 经纪人管理-修改
         */
        changeBroker: function (data,cb) {
            $.post(this.baseRequestUrl+"/changeBroker.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 经纪人管理-启用
         */
        openBroker: function (data,cb) {
            $.post(this.baseRequestUrl+"/openBroker.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 经纪人管理-禁用
         */
        closeBroker: function (data,cb) {
            $.post(this.baseRequestUrl+"/closeBroker.php",data,function (result) {
                cb(result);
            })
        },

        /**
         * 经纪人管理-查询
         */
        searchBroker: function (data,cb) {
            data.pageNum = 10;
            $.post(this.baseRequestUrl+"/agent/getList",data,function (result) {
                cb(result);
            })
        }


    };
    return accountAPI;
});
