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





   // 1. 请求数据
   var flag = true

   // 2-2. 准备一个变量接收数组
   var list2 = []

   // 1. 请求数据
   getList_list()
   function getList_list() {
     $.ajax({
       url: '../lib/list.json',
       dataType: 'json',
       success: function (res) {
         // console.log(res)
         // 一共 102 条数据, 数组.length
         // 一页显示多少条(假定一页显示 12 条), 一共 9 页

         // 2. 渲染分页器
         $('section>.pagi').pagination({
           pageCount: Math.ceil(res.length / 15), // 总页数
           current: 1, // 当前页
           jump: true,
           coping: true,
           homePage: '首页', // 首页按钮的文本
           endPage: '末页', // 末页按钮的文本
           prevContent: '上页',
           nextContent: '下页',
           callback: function (api) { // 当你切换页面的时候会触发
             // api.getCurrent() 获取当前是第几页
             // console.log(api.getCurrent())
             let curr = api.getCurrent()

             // console.log(curr)
             // 根据是第几页, 从我的总数组里面筛选出一部分数据
             //   slice 方法包前不包后
             var list = res.slice((curr - 1) * 15, curr * 15)
             // console.log(list)
             // slice 不改变原始数组, 只是从数组里面拿到一些内容
             // splice 方法才是改变原始数组, 从原始数组里面删除

             // 3-2. 每次使用分页器切换的时候渲染一次
             bindHtml(list)
           }
         })

         // 3. 先把第一页的数据渲染一次
         bindHtml(res.slice(0, 15))

         // 2-2. 给全局变量赋值
         list2 = res
       }
     })
   }

   function bindHtml(list) {
     // console.log(list)
     // 根据 list 数组渲染页面就可以了

     let str = ''

     list.forEach(item => {
       str += `
         <li  data-id="${ item.id }">
         <img src="${ item.url }" alt="">
         <p class="name">${ item.name }</p>
         <p class="tittle">${item.tittle}</p>           
         <p class="price">${ item.price }</p>
         </li>
       `
     })

     $('section>.box > ul').html(str)
   }

   // 2. 排序
   var sheng = document.querySelector('.sheng')
   var jiang = document.querySelector('.jiang')
   jiang.onclick = function () {
    list2.sort(function (a, b) {
        if (flag === true) {
          return b.price - a.price
        }
   })
   $('.pagi').pagination({
    pageCount: Math.ceil(list2.length / 15), // 总页数
    current: 1, // 当前页
    jump: true,
    coping: true,
    homePage: '首页', // 首页按钮的文本
    endPage: '末页', // 末页按钮的文本
    prevContent: '上页',
    nextContent: '下页',
    callback: function (api) { // 当你切换页面的时候会触发
      let curr = api.getCurrent()
      // console.log(curr)
      var list = list2.slice((curr - 1) * 15, curr * 15)
      // 3-2. 每次使用分页器切换的时候渲染一次
      bindHtml(list)
    }
  })

  // 3. 先把第一页的数据渲染一次
  bindHtml(list2.slice(0, 15))
   }

   sheng.onclick = function () {
     // 让准备好的变量改变
     flag = true

     // 不管是什么都要把数组重组
     list2.sort(function (a, b) {
       if (flag === true) {
         return a.price - b.price
       }
     })
 
     // console.log(list)

     $('.pagi').pagination({
       pageCount: Math.ceil(list2.length / 15), // 总页数
       current: 1, // 当前页
       jump: true,
       coping: true,
       homePage: '首页', // 首页按钮的文本
       endPage: '末页', // 末页按钮的文本
       prevContent: '上页',
       nextContent: '下页',
       callback: function (api) { // 当你切换页面的时候会触发
         let curr = api.getCurrent()
         // console.log(curr)
         var list = list2.slice((curr - 1) * 15, curr * 15)
         // 3-2. 每次使用分页器切换的时候渲染一次
         bindHtml(list)
       }
     })

     // 3. 先把第一页的数据渲染一次
     bindHtml(list2.slice(0, 15))
   }


// 3. 事件委托绑定一个事件
$('section>.box > ul').on('click', 'li', function () {
  console.log(list2)
  const id = $(this).data('id')
 console.log('我应该找到 list2 这个数组中 id 为 ' + id + ' 的那一条数据')

  // 从总的数据里面找到 id 配套的哪一个数据
  let data = {}

  //应该在这边把商品id存入一个新的数组，然后放到localStorage里面
  for (let i = 0; i < list2.length; i++) {
    //console.log(list2[i].id)
    if (list2[i].id === id) {
      data = list2[i]
      break
    }
  }
  console.log(data)
  localStorage.setItem('goods_info', JSON.stringify(data))
  // 存储好了以后就跳转页面
  window.location.href = './detail.html'
})