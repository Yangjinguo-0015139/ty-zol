//tab切换
function fnTab(){
    $('.product-li').each(function(){
        $(this).on({
            mouseenter:function(){
                $(this).find('.subcate-box').css({display:'block',left:230,top:-1});
            },
            mouseleave:function(){
                $(this).find('.subcate-box').css({display:'none'});
            }
        })
    })
    $('.subcate-box').mouseleave(function(evt){
            $(this).parents('.product-list').css({display:'none'});
            // $(this).css({display:'none'});                   
    })
}
fnTab()
export {fnTab};
