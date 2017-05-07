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
          <h1><a href="/~DAY/hkxt/index.php/Home/orgManage">交易管理系统</a></h1>
          <div><a href="/~DAY/hkxt/index.php/Home/orgManage" class="active">账户管理</a><a href="/clientManage/clientList">客户管理</a><a href="/countManage/countTable">结算管理</a><a href="/sysManage/pwdManage">系统管理</a></div>
        </div>
      </div>
      <div class="main">
        <div class="sidebar"><a href="/~DAY/hkxt/index.php/Home/orgManage" class="active">机构管理</a><a href="/~DAY/hkxt/index.php/Home/userManage">用户管理</a><a href="/~DAY/hkxt/index.php/Home/brokerManage">经纪人管理</a>
          <!--a(class="#{ level[1] == 4 ? 'active' : '' }" href="/~DAY/hkxt/index.php/Home/wqManage") 微圈管理-->
        </div>
        <div class="content">
          <div class="search-bar">
            <select name="roleType">
              <option value="">角色类型</option>
              <option value="">注册会员</option>
              <option value="">经纪人</option>
            </select>
            <input type="text" name="phone" placeholder="手机号码">
            <input type="text" name="orgName" placeholder="机构名称">
            <input type="text" name="nickname" placeholder="关键字：经纪人名称"><a href="javascript:;" class="btn J_search">查询</a>
          </div>
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
                  <th>状态</th>
                  <th>审核状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox">
                  </td>
                  <td>XD001</td>
                  <td>设计师</td>
                  <td>高级经纪人</td>
                  <td>华东</td>
                  <td>13200989999</td>
                  <td>有效/被禁用</td>
                  <td>通过/未通过/未审核</td>
                  <td><a href="javascript:;" class="J_showCheckBroker">审核</a></td>
                </tr>
              </tbody>
            </table>
            <div class="pagination"></div>
          </div>
        </div>
      </div>
      <div data-remodal-id="addBrokerModal" class="remodal addBrokerModal">
        <div class="remodal-head">
          <div class="remodal-title">添加经纪人</div>
          <div data-remodal-action="cancel" class="remodal-close"></div>
        </div>
        <div class="remodal-body">
          <form class="modalForm">
            <div class="form-control">
              <label>所属机构</label>
              <input type="text" name="orgName">
            </div>
            <div class="form-control">
              <label>经纪人ID</label>
              <input type="text" name="id">
            </div>
            <div class="form-control">
              <label>经纪人名称</label>
              <input type="text" name="name">
            </div>
            <div class="form-control">
              <label>手机号码</label>
              <input type="text" name="phone">
            </div>
          </form>
        </div>
        <div class="remodal-footer"><a href="javascript:;" data-remodal-action="confirm" class="remodal-confirm">确认</a></div>
      </div>
      <div data-remodal-id="checkBrokerModal" class="remodal checkBrokerModal">
        <div class="remodal-head">
          <div class="remodal-title">审核经纪人</div>
          <div data-remodal-action="cancel" class="remodal-close"></div>
        </div>
        <div class="remodal-body">
          <form class="modalForm">
            <div class="form-control">
              <label>所属机构</label>
              <input type="text" name="orgName" readonly>
            </div>
            <div class="form-control">
              <label>经纪人ID</label>
              <input type="text" name="id" readonly>
            </div>
            <div class="form-control">
              <label>经纪人名称</label>
              <input type="text" name="name" readonly>
            </div>
            <div class="form-control">
              <label>手机号码</label>
              <input type="text" name="phone" readonly>
            </div>
          </form>
        </div>
        <div class="remodal-footer"><a href="javascript:;" data-remodal-action="cancel" class="remodal-cancel">拒绝</a><a href="javascript:;" data-remodal-action="confirm" class="remodal-confirm">通过</a></div>
      </div>
    </div>
    <script src="/~DAY/hkxt/Public/template/assets/js/vendor/require.js" data-main="/~DAY/hkxt/Public/template/assets/js/common"></script>
    <script>
      require(['common'], function () {
          require(['page/brokerManage']);
      });
    </script>
  </body>
</html>