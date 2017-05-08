/**
 * Created by DAY on 2017/4/15.
 */

define(["jquery"], function ($) {
    var clientAPI = {

        baseRequestUrl:"..",
        /**
         * 客户管理-修改额度
         */
        changeLine: function (data,cb) {
            $.post(this.baseRequestUrl+"/addOrg.php",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-停止交易
         */
        stopTrade: function (data,cb) {
            $.post(this.baseRequestUrl+"/addOrg.php",data,function (result) {
                cb(result);
            })
        },

        /**
         * 客户管理-客户列表
         */
        getClientList: function (data,cb) {
            $.post(this.baseRequestUrl+"/user/getlist",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-客户列表-未平仓列表
         */
        getWPCList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/closePosition",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-客户列表-已平仓列表
         */
        getYPCList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/closePosition",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-客户列表-出金列表
         */
        getOutMoneyList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/out",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-客户列表-入金列表
         */
        getInMoneyList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/keep",data,function (result) {
                cb(result);
            })
        },




        /**
         * 客户管理-持仓查询-列表
         */
        getCCList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/keep",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-平仓查询-列表
         */
        getPCList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/keep",data,function (result) {
                cb(result);
            })
        },
        /**
         * 客户管理-出入金查询-列表
         */
        getCRJList: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/keep",data,function (result) {
                cb(result);
            })
        }

    };
    return clientAPI;
});
