//tab切换
//tab切换
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
//popular-procurement
        let cur=null;
        $(".refresh").click(function(){
            $('.popular-content').empty();
            $.getJSON('../src/popular_content.json',(data)=>{
               let data_str=JSON.stringify(data)? JSON.stringify(data):'';
               let data_obj=JSON.parse(data_str);
               if(cur==='popular01'){
                   cur='popular02';
                   var good=data_obj[cur];
               }else if(cur==='popular02'){
                    cur='popular03'
                    var  good=data_obj[cur];
               }else{
                    cur='popular01';
                    var  good=data_obj[cur];
               }
                for(let key in good){
                        let good_id=key;
                        let commod=good[key];
                            let o_a=document.createElement('a');
                            let o_pop=document.querySelector('.popular-content');
                            o_a.setAttribute('class','popular-item');
                            o_a.innerHTML=`
                                <div class="popular-img" data-good-id="${key}">
                                    <img src="${commod.src}" alt="">
                                </div>
                                <p class="popular-name">${commod.name}</p>
                                <p class="popular-price">${commod.price}.00</p>
                                <button class="buy-btn">立即登录</button>
                            `
                            for(let i=0;i<6;i++){
                                o_pop.appendChild(o_a);
                            }
                      }
                })
          })
