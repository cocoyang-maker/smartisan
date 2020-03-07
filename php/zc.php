<?php
	header('content-type: text/html;charset=utf-8;');
	header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
	header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息
	$uname = $_POST['username'];
    $upass = $_POST['pwd'];
    //连接数据库
    $link = mysqli_connect('localhost', 'root', 'root', 'test');
    //确定sql操作语句
    $sql = "INSERT INTO `login` VALUES(null, '$uname', '$upass')";
    //zai连接的数据库中，执行上面的语句（插入成功返回true，失败false）
    $res = mysqli_query($link, $sql);
    //关闭数据库
    mysqli_close($link);
    //if语句可以理解成 有没有$res
	if ($res) {
        //插入成功返回一个200代码
        //有就返回200
		echo 200;
	} else {
        //插入失败就返回403
        //没有就返回403
		echo 403;
	}
?>