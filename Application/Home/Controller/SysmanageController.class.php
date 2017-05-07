<?php
namespace Home\Controller;
use Think\Controller;
//use Think\Controller\restController;
class SysmanageController extends Controller {
    /*
    *
    *
    */
     public function __construct()
    {
      # code...

      parent::__construct();

    }
    public function pwdManage(){
        $this->display('Sysmanage/pwdManage');
    }

}
