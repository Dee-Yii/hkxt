<?php
namespace Home\Controller;
use Think\Controller;
//use Think\Controller\restController;
class AccountmanageController extends Controller {
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
    public function orgManage(){
        $this->display('accountManage/orgManage');
    }
    public function userManage(){
      $this->display('accountManage/userManage');
    }
    public function brokerManage(){
      $this->display('accountManage/brokerManage');
    }
    public function queryPhoneNum(){
      $phoneNum = $_POST['phoneNum'];
      $map['phoneNum'] = $phoneNum;
      $user_info = M('user_info')->where($map)->find();
      $this->ajaxReturn($user_info);
    }
    public function addUser(){

      $username = $_POST['username'];
      $password = $_POST['password'];
      if(CRYPT_SHA256 == 1){
        $password = crypt(crypt($password, 't1@s#df!'),$username);
      }
      $nickname = $_POST['nickname'];
      $Model = M('user_info');
      $Model->nickname = $nickname;
      $Model->phoneNum = $username;
      $Model->passwd = $password;
      $Model->registerTime = date("Y-m-d H:i:s");

      $res = $Model->add();
      echo $res;
    }
}
