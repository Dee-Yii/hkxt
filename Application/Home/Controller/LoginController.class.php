<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
  public function login(){
    $this->display('login');
  }
    public function dologin()
    {
      $username = $_POST['uid'];
      $_POST['pass'] = MD5($_POST['pass']);
      $_POST['status'] =0;

      $res = M('admin_user')->where($_POST)->find();

      if($res){
        session('user',$res);//store seession
        $this->ajaxReturn(array(
            'code'=>0,
            'message'=>'success',
            'data'=>'登陆成功',

        ));
      }else{
        $this->ajaxReturn(array(
            'code'=>-1,
            'message'=>'fail',
            'data'=>'密码错误',

        ));
      }

    }


}
