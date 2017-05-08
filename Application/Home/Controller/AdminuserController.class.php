<?php
namespace Home\Controller;
use Think\Controller;
//use Think\Controller\restController;
class AdminuserController extends Controller {
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

      }
    }

    public function getList(){
      $user_info =M('admin_user');
      $pageNum = isset($_POST['pageNum'])?$_POST['pageNum']:5;
      $page = isset($_POST['page'])?$_POST['page']:1;
      $timeStart = date("Y-m-d H:i:s",strtotime($_POST['starTime']));
      $timeEnd = date("Y-m-d H:i:s",strtotime($_POST['endTime']));
      if(!empty($_POST['nickname'])){
        $map['nickname'] = array('like',$_POST['nickname']."%");
      }
      if(!empty($_POST['cellphone'])){
        $map['cellphone'] = array('like',$_POST['cellphone']."%");
      }

      if(!empty($_POST['start_time']) || !empty($_POST['end_time'])){
        $map['registerTime'] = array(array('gt','$timeStart'),arry('lt','$timeEnd')) ;
      }
       $count = $user_info->where($map)->count();// 查询满足要求的总记录数
       $list = $user_info->where($map)->page($page,$pageNum)->select();//获取分页数据

        foreach($list as $key =>$value){
         $memberMap['memberid'] = $value['memberid'];
         //$agentMap['code'] = $value['agentid'];
         $memberInfo = M('member_info')->where($memberMap)->find();
         //$agentInfo = M('agent_info')->where($agentMap)->find();
         $list[$key]['memberInfo'] = $memberInfo;
         //[$key]['agentInfo'] = $agentInfo;
       }
       $Page       = new \Think\Page($count,$pageNum);// 实例化分页类 传入总记录数和每页显示的记录数(25)
       $data['totalPages'] = $count;
       $data['pageNum'] =$pageNum;
       $data['page'] = $page;
       $data['totalPages'] = ceil($count/$pageNum);
       $data['list'] = $list;
      $this->ajaxReturn($data);
    }

    public function addUser(){
      $adminUser = M('admin_user');
      $data['uid'] = $_POST['uid']?$_POST['uid']:'123';
      $data['pass'] = md5($_POST['password'])?md5($_POST['password']):123;
      $data['nickname'] = $_POST['nickname'];
      $data['memberId'] =$_POST['memberId'];
      $data['registerTime'] =date("Y-m-d H:i:s",time());
      $res = $adminUser->add($data);
      //echo $adminUser->getLastSql();exit;
      if($res){
        $return =  array(
          'code'=>0,
          'message'=>'success',

        );
      }else{
         $return =  array(
           'code' =>-1 ,
           'message'=>'fail'
          );
      }

      $this->ajaxReturn($return);
    }
    public function delUser(){
        $adminUser = M('admin_user');
        $id = $_POST['id'];
        foreach($id as $key=>$value){
            $map['id'] = $value;
            $res = $adminUser->where("id= $value")->delete();

        }
        if($res) {
            $return = array(
                'code' => 0,
                'message' => 'success',

            );
        }else{
            $return = array(
                'code' => -1,
                'message' => 'fail',

            );
        }
        $this->ajaxReturn($return);
    }
    public function  updateUser(){
      $adminUser = M('admin_user');
      $id = $_POST['id'];
      $data['uid'] = $_POST['uid'];
      $data['pass'] = md5($_POST['password']);
      $data['nickname'] = $_POST['nickname'];
      $data['memberId'] =$_POST['memberId'];
      $res = $adminUser->where("id = $id")->save($data);

      if($res){
        $return =  array(
          'code'=>0,
          'message'=>'success',

        );
      }else{
         $return =  array(
           'code' =>-1 ,
           'message'=>'fail'
         );
      }
      $this->ajaxReturn($return);
    }
    public function updateStatus(){
      $adminUser = M('admin_user');

      $map = $_POST['id'];
      $data['status'] = $_POST['status'];
      foreach($map as $key=>$value){
        $adminUser->where("id= $value")->save($data);

      }
      $return =  array(
        'code'=>0,
        'message'=>'success',

      );
      $this->ajaxReturn($return);
    }
    public function resetPassword(){
      $adminUser = M('admin_user');

      $id = $_POST['id'];
      $data['pass'] = md5($_POST['password']);
      $res =  $adminUser->where("id= $id")->save($data);
      if($res){
      $return =  array(
        'code'=>0,
        'message'=>'success',

      );
    }else{
      $return =  array(
        'code'=>-1,
        'message'=>'fail',

      );
    }
      $this->ajaxReturn($return);
    }
}
