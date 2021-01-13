window.onload = function () {

    //pc端

    //禁止用户缩放页面
    function cancelCtrl() {
        const keyCodeMap = {
            // 91: true, // command
            61: true,
            107: true, // 数字键盘 +
            109: true, // 数字键盘 -
            173: true, // 火狐 - 号
            187: true, // +
            189: true, // -
        };
        // 覆盖ctrl||command + ‘+’/‘-’
        document.onkeydown = function (event) {
            const e = event || window.event;
            const ctrlKey = e.ctrlKey || e.metaKey;
            if (ctrlKey && keyCodeMap[e.keyCode]) {
                e.preventDefault();
            } else if (e.detail) { // Firefox
                event.returnValue = false;
            }
        };
        // 覆盖鼠标滑动
        document.body.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                if (e.deltaY < 0) {
                    e.preventDefault();
                    return false;
                }
                if (e.deltaY > 0) {
                    e.preventDefault();
                    return false;
                }
            }
        }, {
            passive: false
        });
    }


    cancelCtrl();


    //动态改变字体大小
    window.onresize = function () {
        var size = document.documentElement.clientWidth / 41.4;
        if (size > 10) {
            document.documentElement.style.fontSize = '10px';
        } else {
            document.documentElement.style.fontSize = size + 'px';
        }

    };



    //移动端   #box > header > div.left > span
    (function () {
        var openMenu = document.querySelector('header>.left      >.icon-wode');
        var Menu = document.querySelector('#m-menu-right');
        var closeMenu = document.querySelector('#m-menu-right>header>span');

        // console.log(oMenu);
        var timer = null;


        //菜单动画
        function menuMove(tar_width) {
            // debugger;
            var speed = 5;
            var w = 0;
            if (tar_width == 50) {
                speed = speed;
            } else {
                speed = -speed;
                w = 50;
            }
            clearInterval(timer);
            timer = setInterval(function () {
                w += speed;
                if (w >= 50) {
                    clearInterval(timer);
                } else if (w <= 0) {
                    clearInterval(timer);
                }
                Menu.style.width = w + '%';

            }, 30)

        }

        openMenu.ontouchstart = function () {
            menuMove(50);
        };
        closeMenu.ontouchstart = function () {
            // debugger;
            menuMove(0);
        }


        //图标互动
        var aIconont = document.querySelectorAll('.ic');
        var menu_bottom_lis = document.querySelectorAll('#m-menu-bottom li');
        var menu_right_lis = document.querySelectorAll('#m-menu-right li');


        for (var i = 0; i < aIconont.length; i++) {
            aIconont[i].index = i;
            aIconont[i].ontouchstart = function () {
                aIconont[this.index].style.color = 'white';
            }
            aIconont[i].ontouchend = function () {
                aIconont[this.index].style.color = 'black';
            }
        }

        function clearStyle(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].firstElementChild.style.color = 'black';
                nodes[i].firstElementChild.firstElementChild.style.color = 'black';
            }
        }

        function setStyle(node) {
            for (var i = 0; i < node.length; i++) {
                node[i].index = i;
                node[i].ontouchstart = function () {
                    clearStyle(node);
                    // node[this.index].setAttribute('class', 'active');
                    node[this.index].firstElementChild.style.color = 'white';
                    node[this.index].firstElementChild.firstElementChild.style.color = 'white';

                }

            }
        }

        function touch() {
            setStyle(menu_bottom_lis);
            setStyle(menu_right_lis);

        }

        touch();

    })();


}