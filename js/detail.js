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
          //console.log(res)

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






// 1. 获取 localStorage 里面的数据
let goodsInfo = JSON.parse(localStorage.getItem('goods_info'))

// 判断一下数据
if (goodsInfo === null) {
  alert('您查看的商品详情不存在了')
  window.location.href = './list.html'
} else {
  //alert('我要渲染页面, 内容就是 ' + goodsInfo.name)
   // 3. 渲染页面
   bindHtml()
   function bindHtml() {
     $('section>.goodsInfo>.left>img').attr('src', goodsInfo.url)
     $('section>.goodsInfo>.right>.goodsName').text(goodsInfo.name)
     $('section>.goodsInfo>.right>.tittle').text(goodsInfo.tittle)
     $('section>.goodsInfo>.right>.price').text('￥: ' + goodsInfo.price)
   }
}


$('.goodsInfo>.right>.btn>.addCart').click(() => {
  //console.log("我要添加购物车了")
  const cartList = JSON.parse(localStorage.getItem('cartList')) || []
  //console.log(cartList)
  //      返回值:
  //        true: 表示数组里面有这个信息
  //        false: 表示数组里面没有这个信息
  let exits = cartList.some(item => {
    return item.id === goodsInfo.id
  })

  // console.log(exits)
  if (exits) {
    // 表示有这个信息了, 我们要让 number ++
    // console.log('已经存在 number ++')
    // 找到这个信息给他 number ++
    let data = null
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === goodsInfo.id) {
        data = cartList[i]
        break
      }
    }
    // data 就是我找到的这个信息
    data.number++

    // 4-5. 数量添加的时候, 小计价格要改变
    data.xiaoji = data.number * data.price // 数量 * 单价
  } else {
    // 表示没有这个信息, 直接 push 就可以了
    // push 之前, 象里面添加一个 number 信息为 1
    goodsInfo.number = 1

    // 4-5. 多添加一些信息
    goodsInfo.xiaoji = goodsInfo.price // 因为默认是第一个, 小计就是单价
    goodsInfo.isSelect = false // 默认不选中
    cartList.push(goodsInfo)
  }

  // 在存储到 localStorage 里面
  localStorage.setItem('cartList', JSON.stringify(cartList))
  console.log(cartList)
})


