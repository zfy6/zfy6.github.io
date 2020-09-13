<%--
  Created by IntelliJ IDEA.
  User: lxr
  Date: 2020/6/24
  Time: 8:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>MIshop</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery-3.4.1.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/index1.css">
</head>
<body>
<div class="box">
    <div id="nav">
        <div class="logo">MI</div>
        <ul class="nav_item">
            <li><a href="#">最新上市</a></li>
            <li><a href="#">火爆热搜</a></li>
            <li><a href="#">购物车</a></li>
            <li><a href="#">联系客服</a></li>
            <li><a href="login.jsp">登录</a></li>
        </ul>
        <input type="text">
        <i class="ii">
            <svg t="1594882521906" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="1896" width="20" height="20">
                <path
                        d="M866.6 959.6c-12.4 0-24.7-5.4-33-15.9l-197-247.2c-14.5-18.2-11.5-44.7 6.7-59.2 118.4-94.4 137.9-267.5 43.6-385.9-94.4-118.4-267.5-138-385.9-43.6-118.4 94.4-138 267.5-43.6 385.9C318.6 670.5 416.8 709 514.2 694c23-3.6 44.5 12.3 48 35.3 3.5 23-12.3 44.5-35.3 48C400 797 271.4 746.6 191.5 646.2c-59.7-75-86.7-168.7-75.9-263.9 10.7-95.2 58-180.6 132.9-240.3 154.7-123.2 381-97.8 504.3 57 114.3 143.5 100.5 348.7-25.6 476l172.3 216.2c14.5 18.2 11.5 44.7-6.7 59.2-7.7 6.2-17 9.2-26.2 9.2z"
                        fill="#009FE8" p-id="1897"></path>
            </svg>
        </i>
    </div>
    <div id="menue">
        <ul class="menue_item">
            <li><a href="#xm_num">小米数字系列</a></li>
            <li><a href="#rm_x">RedmiX系列</a></li>
            <li><a href="#xm_c">小米cc系类</a></li>
            <li><a href="#xm_m">小米MIX系列</a></li>
            <li><a href="#rm_num"> Redmi数字系列</a></li>
            <li><a href="#rm_k">RedmiK系列</a></li>
        </ul>
    </div>
    <div id="lunbo" class="carousel slide" data-ride="carousel">
        <!-- 指示符 -->
        <ul class="carousel-indicators">
            <li data-target="#lunbo" data-slide-to="0" class="active"></li>
            <li data-target="#lunbo" data-slide-to="1"></li>
            <li data-target="#lunbo" data-slide-to="2"></li>
            <li data-target="#lunbo" data-slide-to="3"></li>
        </ul>

        <!-- 轮播图片 -->
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="images/1.jpg">
            </div>
            <div class="carousel-item">
                <img src="images/2.jpg">
            </div>
            <div class="carousel-item">
                <img src="images/3.jpg">
            </div>
            <div class="carousel-item">
                <img src="images/4.jpg">
            </div>
        </div>

        <!-- 左右切换按钮 -->
        <a class="carousel-control-prev" href="#lunbo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#lunbo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>



    <div class="content">
        <div class="content_item">
            <h2 id="xm_num">小米数字系列</h2>
            <table class="table">
                <tr>
                    <th>图片</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>操作</th>
                </tr>
                <c:forEach var="g" items="${list}">
                    <tr>
                        <td>
                            <img src="/goodsimg/${g.g_url}">
                        </td>
                        <td>
                                ${g.g_name}
                        </td>
                        <td>
                                ${g.g_price}
                        </td>
                        <td>
                            <a href="login.jsp" id="#login">加入购物车</a>
                        </td>
                    </tr>
                </c:forEach>
            </table>
        </div>
        <div class="content_item">
            <h2 id="rm_x">RedmiX系列</h2>
        </div>
        <div class="content_item">
            <h2 id="xm_c">小米cc系类</h2>
        </div>
        <div class="content_item">
            <h2 id="xm_m">小米MIX系列</h2>
        </div>
        <div class="content_item">
            <h2 id="rm_num">Redmi数字系列</h2>
        </div>
        <div class="content_item">
            <h2 id="rm_k">RedmiK系列</h2>
        </div>
    </div>
    <a href="#nav" class="top">TOP</a>
</div>
<script>
    window.onload = function () {
        var svg = document.querySelector(".icon");
        var ii = document.querySelector(".ii");
        var table = document.querySelector(".table");
        ii.addEventListener("mouseenter", function () {
            svg.style.transition = "0.5s";
            svg.style.transform = "scale(1.6,1.6)"
        });
        ii.addEventListener("mouseleave", function () {
            svg.style.transform = "scale(1,1)"

        });

            var http = new XMLHttpRequest();
            http.open("get", "IndexServlet", true);
            http.send();

        var  login = document.querySelector("#login");
        login.addEventListener("click",function () {
            alert("你还没有登录，请先登陆吧！");
        })
        // $.ajax({
        //     url: "IndexServlet",
        //     type: "get",
        //     dataType: "json",
        //     success: function(data){
        //         /*这个方法里是ajax发送请求成功之后执行的代码*/
        //         showData(data);
        //                },
        //     error: function(msg){
        //         alert("ajax连接异常："+msg);
        //           }
        // });


        // function showData(data) {
        //     var str ="";
        //     for (var i =0;i<data.length;i++) {
        //         str = "<tr><td><img src='/goodsimg/"+data[i].g_uri+"'></td><td>"+data[i].g_name+"</td><td>"+data[i].g_price+"</td><td><a href='#'>加入购物车</a></td></tr>";
        //         table.append(str);
        //     }
        // }
    }


</script>
</body>
</html>
