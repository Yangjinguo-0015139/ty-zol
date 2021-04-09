$(".product-li").each(function(){$(this).on({mouseenter:function(){$(this).find(".subcate-box").css({display:"block",left:230,top:-1})},mouseleave:function(){$(this).find(".subcate-box").css({display:"none"})}})});let cur=null;$(".refresh").click(function(){$(".popular-content").empty(),$.getJSON("../src/popular_content.json",t=>{var p,r,t=JSON.stringify(t)?JSON.stringify(t):"",t=JSON.parse(t);for(r in p=(cur="popular01"===cur?"popular02":"popular02"===cur?"popular03":"popular01",t[cur])){var n=p[r];let e=document.createElement("a"),o=document.querySelector(".popular-content");e.setAttribute("class","popular-item"),e.innerHTML=`
                                <div class="popular-img" data-good-id="${r}">
                                    <img src="${n.src}" alt="">
                                </div>
                                <p class="popular-name">${n.name}</p>
                                <p class="popular-price">${n.price}.00</p>
                                <button class="buy-btn">立即登录</button>
                            `;for(let t=0;t<6;t++)o.appendChild(e)}})});