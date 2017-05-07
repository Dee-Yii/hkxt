<?php
namespace Home\Controller;
use Think\Controller;
//use Think\Controller\restController;
class ClientmanageController extends Controller {
    /*
    *
    *
    */
     public function __construct()
    {
      # code...
      parent::__construct();
      if(!session('user')){
        //$this->ajaxReturn(array('code'=>-1,'message'=>'fail','data'=>'not login'));
        $this ->redirect('login/login',Null,0);
      }

    }
    public function clientList(){
        $this->display('clientManage/clientList');
    }
    public function userManage(){
      $this->display('accountManage/userManage');
    }
    public function brokerManage(){
      $this->display('accountManage/brokerManage');
    }
    public function buyLog(){
        $phone= "18657195470";
        $user_info = M('user_info');
        $map['phoneNum'] = $phone;
        $userInfo = $user_info->where($map)->find();
        $this->assign('userInfo',$userInfo);
        $this->display('clientManage/clientListView/buyLog');
    }
    public function inlog(){
        $uid= $_GET['uid'];
        $user_info = M('user_info');
        $map['uid'] = $uid;
        $userInfo = $user_info->where($map)->find();
        $this->assign('userInfo',$userInfo);
        $this->display('clientManage/clientListView/inlog');
    }
    public function outLog(){
        $uid= $_GET['uid'];
        $user_info = M('user_info');
        $map['uid'] = $uid;
        $userInfo = $user_info->where($map)->find();
        $this->assign('userInfo',$userInfo);
        $this->display('clientManage/clientListView/outlog');
    }

    public function wpcLog(){
        $uid= $_GET['uid'];
        $user_info = M('user_info');
        $map['uid'] = $uid;
        $userInfo = $user_info->where($map)->find();
        $this->assign('userInfo',$userInfo);
        $this->display('clientManage/clientListView/wpcLog');
    }
    public function ypcLog(){
        $uid= $_GET['uid'];
        $user_info = M('user_info');
        $map['uid'] = $uid;
        $userInfo = $user_info->where($map)->find();
        $this->assign('userInfo',$userInfo);
        $this->display('clientManage/clientListView/ypcLog');
    }
}
