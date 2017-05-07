<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title></title>
    <link rel="stylesheet" href="/qaq/Public/template/assets/css/index.min.css">
  </head>
  <body>
    <div class="wrap">
      <div class="header">
        <div class="clearfix layout">
          <h1><a href="/qaq/index.php/Home/accountmanage/userManage">交易管理系统</a></h1>
          <div><a href="/qaq/index.php/Home/accountmanage/userManage" class="active">账户管理</a><a href="/qaq/index.php/Home/clientmanage/clientList">客户管理</a><a href="/countManage/countTable">结算管理</a><a href="/sysManage/pwdManage">系统管理</a></div>
        </div>
      </div>
      <div class="main">
        <div class="sidebar"><a href="/qaq/index.php/Home/accountmanage/userManage"class="active">用户管理</a><a href="/qaq/index.php/Home/accountmanage/orgManage" >机构管理</a><a href="/qaq/index.php/Home/accountmanage/brokerManage">经纪人管理</a>
          <!--a(class="#{ level[1] == 4 ? 'active' : '' }" href="/qaq/index.php/Home/wqManage") 微圈管理-->
        </div>
        <div class="content">
          <!--<div class="search-bar">
            <select name="roleType">
              <option value="">角色类型</option>
              <option value="">注册会员</option>
              <option value="">经纪人</option>
            </select>
            <input type="text" placeholder="手机号码">
            <input type="text" placeholder="机构名称">
            <input type="text" placeholder="关键字：用户名称"><a href="javascript:;" class="btn">查询</a>
          </div>-->
          <div class="control-bar"><a href="javascript:;" class="btn J_showAdd">新建</a><a href="javascript:;" class="btn J_updateStatus open-i">启用</a><a href="javascript:;" class="btn J_updateStatus close-i">禁用</a><a href="javascript:;" class="btn J_onDel">删除</a></div>
          <div class="data-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox">
                  </th>
                  <th>登录账号</th>
                  <th>用户昵称</th>
                  <th>角色类型</th>
                  <th>所属机构</th>
                  <th>手机号码</th>
                  <th>最后登录时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
            <div class="pagination"></div>
          </div>
        </div>
      </div>
      <div data-remodal-id="addUserModal" class="remodal addUserModal">
        <div class="remodal-head">
          <div class="remodal-title">添加用户</div>
          <div data-remodal-action="cancel" class="remodal-close"></div>
        </div>
        <div class="remodal-body">
          <form class="modalForm">
            <div class="form-control">
              <label>所属机构</label>
              <select name="org">
                <option value="0">客服</option>
                <option value="1">结算专员</option>
                <option value="2">后台维护管理员</option>
              </select>
            </div>
            <div class="form-control">
              <label>登录账号</label>
              <input type="text" name="username">
            </div>
            <div class="form-control">
              <label>登录密码</label>
              <input type="text" name="password">
            </div>
            <div class="form-control">
              <label>用户名称</label>
              <input type="text" name="nickname">
            </div>
          </form>
        </div>
        <div class="remodal-footer"><a href="javascript:;" class="remodal-confirm">确 定</a></div>
      </div>
      <div data-remodal-id="changeUserModal" class="remodal changeUserModal">
        <div class="remodal-head">
          <div class="remodal-title">修改用户</div>
          <div data-remodal-action="cancel" class="remodal-close"></div>
        </div>
        <div class="remodal-body">
          <form class="modalForm">
            <div class="form-control">
              <label>所属机构</label>
              <select name="org">
                <option value="0">客服</option>
                <option value="1">结算专员</option>
                <option value="2">后台维护管理员</option>
              </select>
            </div>
            <div class="form-control">
              <label>登录账号</label>
              <input type="text" name="username">
            </div>
            <div class="form-control">
              <label>登录密码</label>
              <input type="text" name="password">
            </div>
            <div class="form-control">
              <label>用户名称</label>
              <input type="text" name="nickname">
            </div>
          </form>
        </div>
        <div class="remodal-footer"><a href="javascript:;" class="remodal-confirm">确 定</a></div>
      </div>
      <div data-remodal-id="resetPwdModal" class="remodal resetPwdModal">
        <div class="remodal-head">
          <div class="remodal-title">重置密码</div>
          <div data-remodal-action="cancel" class="remodal-close"></div>
        </div>
        <div class="remodal-body">
          <form class="modalForm">
            <div class="form-control">
              <label>登录账号</label>
              <input type="text" name="username" readonly>
            </div>
            <div class="form-control">
              <label>用户名称</label>
              <input type="text" name="nickname" readonly>
            </div>
            <div class="form-control">
              <label>新密码</label>
              <input type="text" name="password">
            </div>
          </form>
        </div>
        <div class="remodal-footer"><a href="javascript:;" data-remodal-action="confirm" class="remodal-confirm">确 定</a></div>
      </div>
    </div>
    <script src="/qaq/Public/template/assets/js/vendor/require.js" data-main="/qaq/Public/template/assets/js/common"></script>
    <script>
      require(['common'], function () {
          require(['page/userManage']);
      });
    </script>
  </body>
</html>