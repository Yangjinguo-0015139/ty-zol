class Registor{
    constructor(){
        //个人注册
        this.$person=$('.person');
        //企业注册
        this.$enterprise=$('.enterprise');
        //所有的input
        this.$inps=$('input');
        //获取验证码
        this.$get=$('.get-message');
        //存放验证码
        this.$div=$('.message-content');
        //数组
        this.arr=[false,false,false,false];
        //获取遮罩层
        this.$float=$('.float');
        //获取弹出层
        this.$mark=$('.mark');
        this.$disc=$('.disc');
        //调用添加事件的方法
        this.addEvent();
    }
    addEvent(){
        let that=this;
        //获取验证码按钮
           this.$get.click(function(){
               //手机号验证
               let str_p=that.$inps.eq(0).val();
               let re=/^(13|14|15|16|17|18|19)\d{9}$/;
            //    console.log(str_p,re);
               if(re.test(str_p)){
                  that.arr[0]=true;
                  that.$div.empty();
                  let str="";
                  for(let i=0;i<6;i++){
                      str+=$.randInt(0,9)
                  }
                  that.$div.append(str);
                  that.$float.css({display:"block",height:$(document).height(),zIndex:995});
                  that.$mark.css({display:"block",zIndex:996});
                  $('body').css({overflow:"hidden"});
                  $('.disc').drag();
              }else{
                 $('.error').html('手机格式不正确');
              }      
          })
          //聚焦文本框自动清除错误提示内容
          this.$inps.eq(0).focus(function(){
              $(this).next().html('');
          })
          this.$inps.eq(1).focus(function(){
             $(this).next().html('');
          })
          this.$inps.eq(2).focus(function(){
             $(this).next().html('');
          })
          this.$inps.eq(3).focus(function(){
             $(this).next().html('');
          })
          //短信验证码验证
          this.$inps.eq(1).blur(function(){
               let str=$(this).val();
               let old_str=that.$div.html();
               if(str==old_str){
                   that.arr[1]=true;
                    alert('验证码输入正确')
               }else{
                    alert('验证码输入错误')
               }
          })
          //密码验证
          this.$inps.eq(2).blur(function(){
              let str=$(this).val();
              let re=/\w{8,20}/;
              if(re.test(str)){
                 that.arr[2]=true;
              }else{
                $('.apssword').html('请设置8-20位包含数字，大小写字母和特殊字符的密码');
              }
          })
          //密码确认
          if( this.$inps.eq(2).val()){
                this.$inps.eq(3).blur(function(){
                    let str=$(this).val();
                    let new_str= that.$inps.eq(2).val();
                    if(str==new_str){
                    that.arr[3]=true;
                    }else{
                    $('.apssword-aff').html('与上次输入密码不符');
                    }
                })
          }
          //提交
          $('.account-sub').click(function(){
                 if(that.arr.indexOf(false)===-1){
                     let cookie_str=$.cookie('user')? $.cookie('user'):'';
                      let cookie_obj=$.coverStrToObj(cookie_str);
                      let uname=that.$inps.eq(0).val()
                     if(uname in cookie_obj){
                         alert('该手机号已经被注册过')
                      }else{
                          cookie_obj['user']={
                              uname: that.$inps.eq(0).val(),
                              password:that.$inps.eq(2).val()
                          }
                      }
                       //创建cookie
                       $.cookie('user',JSON.stringify(cookie_obj));
                 }
           })
           //企业注册
           this.$enterprise.click(function(){
            $(this).css({background:"#fc002d",color:"#fff"});
            $(this).prev().css({background:"#fff",color:"#717171","border":"1px solid #717171"})
            $('.post-progress').css({display:'block'});
          })
          //个人注册
          this.$person.click(function(){
               $(this).css({background:"#fc002d",color:"#fff"});
               $(this).next().css({background:"#fff",color:"#717171","border":"1px solid #717171"})
               $('.post-progress').css({display:'none'});
           })
       }
   }
    $.extend({
       randInt:function(min,max){
          if(min>max){
              [min,max]=[max,min];
          }
          return Math.floor(Math.random()*(max-min+1)+min);
       },
       countdown :function(num){
           let  i=num;
           let timer=setInterval(()=>{
                i--;
                if(i===0){
                    $('.get-message').css({display:"block"});
                    $('.time-piece').css({display:"none"});
                    $('.message-content').empty();
                    clearInterval(timer);
                    return;
                }
                $('.time-piece').html($(`<span>(${i})s后可再次获取</span>`).html());
           },1000)
       },
       coverStrToObj:function(str){
           if(!str){
               return {};
           }
           return JSON.parse(str);
       }
    })
    $.fn.extend({
        drag(){
            let that=this;
           this.mouseenter((evt)=>{
              this.dis_x=evt.pageX-this.offset().left;
              this.dis_y=evt.pageY-this.offset().top;
              $(document).mousemove((evt)=>{
                  let left=evt.pageX-this.dis_x-420;
                  if(left<=0){
                      left=0;
                  }else if(left>=$('.progress-bar').width()-this.width()){
                    left=$('.progress-bar').width()-this.width();
                  }
                  $('.left-puzzle').css({left:left});
                  this.css({left:left});
                  if(left==110){
                      $('.float').css({display:"none",zIndex:0});
                      $('.mark').css({display:"none",zIndex:0});
                      $('.get-message').css({display:"none"});
                      $('.time-piece').css({display:"block"});
                      $.countdown(60);//开启倒计时
                      alert('图片验证成功');
                  }
              })
              $(document).mouseup(function(){
                  $(this).off();
              })
                 return false;
           })
        }
    })
new Registor()