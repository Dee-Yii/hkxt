<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title></title>
    <link rel="stylesheet" href="/~DAY/hkxt/Public/template/assets/css/index.min.css">
  </head>
  <body>
    <div class="wrap">
      <div class="header">
        <div class="clearfix layout">
          <h1><a href="/~DAY/hkxt/index.php/Home/accountmanage/userManage">交易管理系统</a></h1>
          <div><a href="/~DAY/hkxt/index.php/Home/accountmanage/userManage" >账户管理</a><a href="/~DAY/hkxt/index.php/Home/clientmanage/clientList">客户管理</a><a href="/~DAY/hkxt/index.php/Home/countmanage/countTable" class="active">结算管理</a><!--<a href="/sysManage/pwdManage">系统管理</a>--></div>
        </div>
      </div>
      <div class="main">
        <div class="sidebar"><a href="/~DAY/hkxt/index.php/Home/countManage/countTable" class="active">统计报表</a><!--<a href="javascript:;">机构结算</a><a href="javascript:;">经纪人结算</a>--></div>
        <div class="content">
          <div class="control-bar"><!--<a href="javascript:;" class="btn">客户</a><a href="javascript:;" class="btn">经纪人</a><a href="javascript:;" class="btn">微圈</a></div>
          <div class="search-bar">时间:
            <input type="text">-
            <input type="text">
            <input type="text" placeholder="关键字：机构名称">
            <input type="text" placeholder="上级机构">
            <input type="text" placeholder="昵称">
            <input type="text" placeholder="手机号码"><a href="javascript:;" class="btn">查询</a>--><a href="/~DAY/hkxt/index.php/Home/trade/exceFile" target="_blank"   class="btn">导出EXL</a>
          </div>
          <div class="data-container">
            <div class="count-table">
              <table>
                <thead>
                  <tr>
                    <th>交易时间</th>
                    <th>交易用户名称</th>
                    <th>交易商品名称</th>
                    <th>买卖方向</th>
                    <th>收益</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="pagination"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="/~DAY/hkxt/Public/template/assets/js/vendor/require.js" data-main="/~DAY/hkxt/Public/template/assets/js/common"></script>
    <script>
      require(['common'], function () {
          require(['page/countTable']);
      });
    </script>
  </body>
</html>