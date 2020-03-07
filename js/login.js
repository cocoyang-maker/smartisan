$(".btn-login").click(function () {
    let username = $("input[name='username']").val();
    let pwd = $("input[name='password']").val();
    console.log(username,pwd);
    
    $.ajax({
        url: 'http://localhost/src/php/login.php',
        type: 'post',
        data: {
            username: username,
            pwd: pwd
        },
        success: function (res) {
            console.log(res);
            if (res === "200") {
                alert("登录成功");
                window.location.href = './index.html'
                                  } else {
                alert("用户名或密码错误!")
            }
        }
    })
})

$(".btn-zc").click(function () {
    let username = $("input[name='username']").val();
    let pwd = $("input[name='password']").val();
    console.log(username,pwd);
    
    $.ajax({
        url: 'http://localhost/src/php/zc.php',
        type: 'post',
        data: {
            username: username,
            pwd: pwd
        },
        success: function (res) {
            console.log(res);
            if (res === "200") {
                alert("注册成功，请重新登陆");
                                  } else {
                alert("注册失败，请重新注册")
            }
        }
    })
})

