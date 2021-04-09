import {fnTab} from './public.js';
$(function(){
    $('#all-commod').mouseenter(function(){
        $('.product-list').css({display:'block'});
    })
    fnTab();
    new Detail();
})
function Detail(){
    this.$small_img=$('.swiper-slide').find('img');
    this.$big_box=$('.big-banner')
    this.$big_img=$(this.$big_box).children('img');
    this.$lbtn=$('.swiper-button-prev');
    this.$rbtn=$('.swiper-button-next');
    this.index=null;
    this.addEvent();
    this.switch();
}
Detail.prototype={
    constructor:Detail,
    addEvent:function(){
        let that=this;
        //小图操作
        // 左按钮
        this.$lbtn.click(function(){
            that.index--;
            if(that.index<=0){
                that.index=0; 
            }
            that.switch();
        })
         // 右按钮
        this.$rbtn.click(function(){
            if(!that.index){
                that.index=0;
                that.$small_img.eq(0).css({border:"2px solid red"});
            }else{
                if(that.index==that.$small_img.length){
                    that.index=that.$small_img.length-1;
                    that.$small_img.eq(that.index).css({border:"2px solid red"});
                    return;
                }else{
                    that.$small_img.eq(that.index).css({border:"2px solid red"});
                    that.$small_img.eq(that.index-1).css({border:"none"});
                }
            }
            that.index++;
            that.switch();
        })
        //点击小图
        $(this.$small_img).each(function(index,item){
            $(this).click(function(){
                  //  记录点击的图片下标
                   that.index=index;
                // 当前下标不为0或者null
                if(that.index){
                    // 点击的图片下标
                        let i=that.$small_img.get().indexOf(item);
                        $(that.$small_img).css({border:"none"});
                        $(that.$small_img).eq(i).css({border:"2px solid red"});
                }else{
                    // 当前下标为0或者null
                    that.index=0;
                    $(that.$small_img).css({border:"none"});
                    $(that.$small_img).eq(0).css({border:"2px solid red"});
                }
            })
        })
        // 大图操作
        this.$lbtn.click(function(){
                $(that.$big_img).eq(that.index).animate({left:-800});
                if(that.index===0){
                    return;
                }
                that.index --;
                console.log(that.index);
        })
    },
    switch:function(){
        let that=this;
        $(that.$small_img).css({border:"none"});
        $(that.$small_img).eq(that.index).css({border:"2px solid red"});
    }
}
