/**
 * Created by DAY on 2017/4/15.
 */

define(["jquery"], function ($) {
    var countAPI = {

        /**
         * 统计报表-获取统计列表
         */
         baseRequestUrl:"../",
        getReport: function (data,cb) {
            $.post(this.baseRequestUrl+"/trade/report",data,function (result) {
                cb(result);
            })
        },

    };
    return countAPI;
});
