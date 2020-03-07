//轮播图
$("section>.home-wrap>.pointer2>span").click(function () {
    $(this).addClass('active').siblings().removeClass('active')
    $("section>.home-wrap>.pointer1>img").removeClass('show').eq($(this).index())
     .addClass('show') 
        });

        let i = -1;
    function foo(){
       
        if(i>=5){
            i=-1
        }
        i++;
    $('section>.home-wrap>.pointer2>span').eq(i)
    .addClass('active').siblings().removeClass('active')
    $("section>.home-wrap>.pointer1>img").eq(i)
    .addClass('show').siblings().removeClass('show')
    };       
    let timer =setInterval(foo,1000);

    $('section>.home-wrap>.pointer1>img').mouseover(function() {
        clearInterval(timer);
    })

    $("section>.home-wrap>.pointer1>img").mouseleave(function() {
        timer =setInterval(foo,1000);  
    })


//吸顶栏
function S(){   
    $(window).scroll(function(){
        if($(window).scrollTop()>45){           
            $(".nav").css({'position':'fixed','top':0})         
        }else{
            $('.nav').css('position','relative')
        }
    })
}
S();


//二级菜单
$('.nav>ul>li').mouseover(function () {
    $('.nav>.nav-list').slideDown();
    $(this).css('color','blue')
})

$('.nav>ul>li').mouseleave(function () {
    $(this).css('color','gray')
})

$('.nav').mouseleave(function () {
    $('.nav>.nav-list').slideUp();
})

//渲染nav
    getList()
    function getList() {
      $.ajax({
        url: '../lib/nav_top.json',
        dataType: 'json',
        success: function (res) {
          console.log(res)

          // 4-1. 准备一个空字符串
          let str = ''

          // 4-2. 渲染一级的 li
          res.forEach(item => {
            str += `<li>${ item.name }</li>`
          })

          // 4-3. 填充到 nav 里面的 ul 里面
          $('.nav > ul')
            .html(str)
            .on({
              mouseenter: () => $('.nav>.nav-list').stop().slideDown(),
              mouseleave: () => $('.nav>.nav-list').stop().slideUp()
            })
            .children('li') // 找到所有的一级菜单下的 li
            .on('mouseover', function () {
              // 5-1. 知道自己移入的时哪一个 li
              const index = $(this).index()
              // 5-2. 找到要渲染的数组
              const list = res[index].list
              // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
              let str = ''

              // 5-4. 进行组装
              list.forEach(item => {
                str += `
                  <li>
                    <div>
                      <img src="${ item.list_url }" alt="">
                    </div>
                    <p class="title">${ item.list_name }</p>
                    <span class="price">${ item.list_price }</span>
                  </li>
                `
              })

              // 5-5. 填充到页面里面
              $('.nav>.nav-list>ul').html(str)
            })
             // 4-4. 给 nav_box 添加一个移入移出事件
          $('.nav>.nav-list')
          .on({
            mouseover: function () { $(this).finish().show() },
            mouseout: function () { $(this).finish().slideUp() }
          })
        }
    })
  }


//hot-goods轮播
$('section>.hot-goods>.hot>.hot1>.lt').click(function () {
  $(this).removeClass('show').next().addClass('show')
  $('section>.hot-goods>ul').animate({'position': 'absolute','left':0}, 1000)
  

})
$('section>.hot-goods>.hot>.hot1>.gt').click(function () {
 $(this).removeClass('show').prev().addClass('show')
 $('section>.hot-goods>ul').css({'position': 'absolute','left':-1214},1000)
})




//hot-goods渲染
getList_hot()
function getList_hot() {
  $.ajax({
    url: '../lib/hot-goods.json',
    dataType: 'json',
    success: function (res) {
      // console.log(res)
      // 1. 准备一个 空字符串
      let str = ''

      // 2. 进行拼接
      // 2-1. 遍历数组
      res.forEach(item => {
        str += `
          <li>
            <img src="${ item.url }" alt="">
            <p class="name">${ item.name }</p>
            <p class="tittle">${item.tittle}</p>           
            <p class="price">${ item.price }</p>
          </li>
        `
      })

      // 3. 渲染到页面上
      $('section>.hot-goods>ul').html(str)
    }
  })
}


//goods-main渲染
getList_main()
function getList_main() {
  $.ajax({
    url: '../lib/goods-main.json',
    dataType: 'json',
    success: function (res) {
      // console.log(res)
      // 1. 准备一个 空字符串
      let str = ''

      // 2. 进行拼接
      // 2-1. 遍历数组
      res.forEach(item => {
        str += `
          <li>
            <img src="${ item.url }" alt="">
            <p class="name">${ item.name }</p>
            <p class="tittle">${item.tittle}</p>           
            <p class="price">${ item.price }</p>
          </li>
        `
      })

      // 3. 渲染到页面上
      $('section>.goods-main>ul').html(str)
    }
  })
}
