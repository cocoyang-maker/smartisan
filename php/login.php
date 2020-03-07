<?php
	header('content-type: text/html;charset=utf-8;');
	header("Access-Control-Allow-Origin:*"); // 允许哪些域名请求我
	header("Access-Control-Request-Methods:GET, POST, PUT, DELETE, OPTIONS"); // 允许哪些请求方式
    header('Access-Control-Allow-Headers:x-requested-with,content-type,test-token,test-sessid'); // 允许携带哪些请求头信息
	$uname = $_POST['username'];
	$upass = $_POST['pwd'];
	$link = mysqli_connect('localhost', 'root', 'root', 'test');
	// 2-2. 执行 sql 语句
	$sql = "SELECT * FROM `login` WHERE `username`='$uname' AND `password`='$upass'";
	
	$res = mysqli_query($link, $sql);
	// 2-3. 解析结果
	$row = mysqli_fetch_assoc($res);
	// 2-4. 断开和数据库的连接
	mysqli_close($link);
	// 3. 根据数据库操作的结果进行操作
	if ($row) {
		//存在返回一个200代码
		echo 200;
	} else {
		//不存在就返回403
		echo 403;
	}
?>
