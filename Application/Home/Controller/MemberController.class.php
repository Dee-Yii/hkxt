<?php
namespace Home\Controller;
use Think\Controller;
//use Think\Controller\restController;
class MemberController extends Controller {
    /*
    *
    *
    */
     public function __construct()
    {
      # code...
      if(!session('user')){
        //$this->ajaxReturn(array('code'=>-1,'message'=>'fail','data'=>'not login'));

      }
    }
    public function getList(){
      $member_info =M('member_info');
      $pageNum = isset($_POST['pageNum'])?$_POST['pageNum']:5;
      $page = isset($_POST['page'])?$_POST['page']:1;

       $count = $member_info->where($map)->count();// 查询满足要求的总记录数
       $list = $member_info->where($map)->page($page,$pageNum)->select();//获取分页数据
       foreach ($list as $key => $value) {
         # code...
         $list[$key]['superMemberInfo'] = "";
         if(!empty($value['superMemberid'])){
           $map['memberid'] = $value['superMemberid'];
           $superMemberInfo = $member_info->where($map)->select();
           $list[$key]['superMemberInfo'] = $superMemberInfo;
         }
       }
       $Page   = new \Think\Page($count,$pageNum);// 实例化分页类 传入总记录数和每页显示的记录数(25)
       $data['totalPages'] = $count;
       $data['pageNum'] =$pageNum;
       $data['page'] = $page;
       $data['totalPages'] = ceil($count/$pageNum);
       $data['list'] = $list;
       $this->ajaxReturn($data);
    }
    public function getlistall(){
       $member_info =M('member_info');
       $list = $member_info->where($map)->page($page,$pageNum)->select();//获取分页数据
       foreach ($list as $key => $value) {
         # code...
         $list[$key]['superMemberInfo'] = "";
         if(!empty($value['superMemberid'])){
           $map['memberid'] = $value['superMemberid'];
           $superMemberInfo = $member_info->where($map)->select();
           $list[$key]['superMemberInfo'] = $superMemberInfo;
         }
       }
       $this->ajaxReturn($list);
    }
    public function addMember(){
      $member_info =M('member_info');
      $name = $_POST['name'];
      $mark = $_POST['mark'];
      $superMemberid = $_POST['superMemberid'];
      $type = $_POST['type'];
      $tel= $_POST['tel'];
      $phone = $_POST['phone'];//机构名称
      $status = 0;//机构名称
      $member_info->name = $name;
      $member_info->mark = $mark;
      $member_info->superMemberid = $superMemberid;
      $member_info->type = $type;
      $member_info->tel = $tel;
      $member_info->phone = $phone;
      $member_info->status =$status;
      $res = $member_info->save();
      if($res){
        $return =  array(
          'code'=>0,
          'message'=>'success',

        );
      }else{
         $return = array('code' =>-1 ,'message'=>fail );
      }

      $this->ajaxReturn($return);
    }
    //查询所有根机构
    public function getRootList(){
      $member_info =M('member_info');
      $data = $member_info->where("superMemberid = 0 ")->select();//获取分页数据
      $this->ajaxReturn($data);
    }
    public function updateMember(){
      $member_info =M('member_info');
      $memberid = $_POST['memberId'];
      $name = $_POST['name'];
      $mark = $_POST['mark'];
      $superMemberid = $_POST['superMemberid'];
      $type = $_POST['type'];
      $tel= $_POST['tel'];
      $phone = $_POST['phone'];//机构名称
      $map['memberid'] = $_POST['memberId'];
      $res = $member_info->where($map)->update($_POST);
      if($res){
        $return =  array(
          'code'=>0,
          'message'=>'success',

        );
      }else{
         $return = array(
           'code' =>-1 ,
           'message'=>'fail' );
      }
      $this->ajaxReturn($return);
    }
    public function updateStatus(){
      $ids=$_POST['memberId'];
      $data['status'] = !empty($_POST['status'])?$_POST['status']:0;
      foreach ($ids as $key => $value) {
        # code...
          M('member_info')->where("id= $value")->save($data);

      }
      $return = array(
        'code'=>0,
        'message'=>'success',

      );
      $this->ajaxReturn($return);

    }

}
