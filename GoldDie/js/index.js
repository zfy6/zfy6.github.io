window.onload = function () {
    let app = $("#app");
    let p1 = new Player({
        name: "张三"
    });
    let xiao = [];
    for (let i = 0; i < 4; i++) {
        xiao[i] = new XiaoEMo({
            name: '小恶魔' + (i + 1)
        })
    }

    // 事件监听     //    j 74    k 75    l 76
    window.onkeydown = function (e) {
        p1.move(e.keyCode);
        p1.skills(e.keyCode);
        for (let i = 0; i < xiao.length; i++) {
            xiao[i].downBlood(p1, e.keyCode);
        }

    }

}

// 选择器
function $(node) {
    let el = document.querySelectorAll(node);
    if (el.length > 1) return el;
    if (el.length == 1) return el[0];
}


// 玩家
function Player(opt) {
    this.name = 'player'; //用户名
    this.blood = 100; //血量
    this.x = 850; //初始坐标
    this.y = 400; //初始坐标
    this.body = ''; //身体dom
    this.weapon = 'jian' //武器
    this.speed = 10; //移动速度
    this.atkNum = 2; //攻击力
    this.atkDistance = 10; //攻击距离
    this.direction = {
        'left': false,
        'top': false,
        'right': false,
        'bottom': false,
    } //记录当前方向，以便位移技能判定方向
    let _this = this;
    let timer, timer2, timer3;
    let dTimerL, dTimerR, dTimerT, dTimerB;
    //替换参数
    if (opt) {
        if (opt.name) this.name = opt.name;
        if (opt.blood) this.blood = opt.blood;
    }

    // 创建playerDom
    this.create = function () {
        //身体
        _this.body = document.createElement('div');
        _this.body.className = 'player';
        _this.body.style.left = _this.x + 'px';
        _this.body.style.top = _this.y + 'px';
        // 名字
        _this.playerNameDom = document.createElement('div');
        _this.playerNameDom.className = 'player-name';
        _this.playerNameDom.innerHTML = _this.name;
        //血条
        _this.playerBloodDom = document.createElement('div');
        _this.playerBloodDom.className = 'player-blood';
        _this.playerBloodBarDom = document.createElement('div');
        _this.playerBloodBarDom.className = 'player-blood-bar';
        _this.playerBloodBarDom.style.width = _this.blood + '%';
        //iconfont图形  人
        _this.icon = document.createElement('div');
        _this.icon.className = 'iconfont icon-ren';
        //iconfont图形  武器-剑1
        _this.iconSword = document.createElement('div');
        _this.iconSword.className = 'iconfont icon-jian';
        //iconfont图形  武器-剑2
        _this.iconSword2 = document.createElement('div');
        _this.iconSword2.className = 'iconfont icon-jian jian2';


        _this.playerBloodDom.appendChild(_this.playerBloodBarDom);
        _this.body.appendChild(_this.playerNameDom);
        _this.body.appendChild(_this.playerBloodDom);
        _this.body.appendChild(_this.icon);
        _this.body.appendChild(_this.iconSword);
        _this.body.appendChild(_this.iconSword2);
        app.appendChild(_this.body);
    }


    //移动
    this.move = function (code) {
        // w 87
        if (code == 87) {
            _this.direction.top = true;
            clearInterval(dTimerT);
            dTimerT = setInterval(function () {
                _this.direction.top = false;
            }, 500)
            //上界限
            if (_this.y <= -50) {
                _this.y = -50;
            }
            _this.y -= _this.speed;
            _this.body.style.top = _this.y + 'px';
        }
        // s 83  
        if (code == 83) {
            _this.direction.bottom = true;
            clearInterval(dTimerB);
            dTimerB = setInterval(function () {
                _this.direction.bottom = false;
            }, 500)
            //下界限
            if (_this.y >= 550) {
                _this.y = 550;
            }
            _this.y += _this.speed;
            _this.body.style.top = _this.y + 'px';
        }
        // a 65 
        if (code == 65) {
            _this.direction.left = true;
            clearInterval(dTimerL);
            dTimerL = setInterval(function () {
                _this.direction.left = false;
            }, 500)
            //左界限
            if (_this.x <= 40) {
                _this.x = 40;
            }
            _this.iconSword2.style.display = 'block';
            _this.iconSword.style.display = 'none';
            _this.x -= _this.speed;
            _this.body.style.left = _this.x + 'px';
        }
        // d 68
        if (code == 68) {
            _this.direction.right = true;
            clearInterval(dTimerR);
            dTimerR = setInterval(function () {
                _this.direction.right = false;
            }, 500)
            //右界限
            if (_this.x >= 900) {
                _this.x = 900;
            }
            _this.iconSword2.style.display = 'none';
            _this.iconSword.style.display = 'block';
            _this.x += _this.speed;
            _this.body.style.left = _this.x + 'px';
        }
    }

    // 技能
    this.skills = function (code) {
        //普通攻击
        if (code == 74) {
            _this.iconSword.style.animation = ' swordATK .1s infinite';
            clearInterval(timer);
            timer = setInterval(function () {
                _this.iconSword.style.animation = '';
            }, 100)

            _this.iconSword2.style.animation = ' sword2ATK .1s infinite';
            clearInterval(timer2);
            timer2 = setInterval(function () {
                _this.iconSword2.style.animation = '';
            }, 100)
        }
        //位移
        if (code == 76) {
            let s_speed = 100; //位移距离
            if (_this.direction.left) {
                _this.x -= s_speed;
                _this.body.style.left = _this.x + 'px';
            }
            if (_this.direction.top) {
                _this.y -= s_speed;
                _this.body.style.top = _this.y + 'px';
            }
            if (_this.direction.right) {
                _this.x += s_speed;
                _this.body.style.left = _this.x + 'px';
            }
            if (_this.direction.bottom) {
                _this.y += s_speed;
                _this.body.style.top = _this.y + 'px';
            }

        }
    }


    this.create();

}



//怪物
function XiaoEMo(opt) {
    this.name = 'xiaoemo';
    this.blood = 100;
    this.xiaoEMoBloodBarDom = '';
    this.x = Math.ceil(Math.random() * 300);
    this.y = Math.ceil(Math.random() * 300);
    this.body = '';
    let _this = this;

    if (opt) {
        if (opt.name) this.name = opt.name;
        if (opt.blood) this.blood = opt.blood;
    }

    //创建怪物Dom
    this.create = function () {
        //身体
        _this.body = document.createElement('div');
        _this.body.className = 'xiaoemo';
        _this.body.style.left = _this.x + 'px';
        _this.body.style.top = _this.y + 'px';
        // 名字
        _this.xiaoEMoNameDom = document.createElement('div');
        _this.xiaoEMoNameDom.className = 'xiaoemo-name';
        _this.xiaoEMoNameDom.innerHTML = _this.name;
        //血条
        _this.xiaoEMoBloodDom = document.createElement('div');
        _this.xiaoEMoBloodDom.className = 'xiaoemo-blood';
        _this.xiaoEMoBloodBarDom = document.createElement('div');
        _this.xiaoEMoBloodBarDom.className = 'xiaoemo-blood-bar';
        _this.xiaoEMoBloodBarDom.style.width = _this.blood + '%';
        //iconfont图形  小恶魔
        _this.icon = document.createElement('div');
        _this.icon.className = 'iconfont icon-xiaoemo';
        //iconfont图形  火焰
        _this.iconRanhu = document.createElement('div');
        _this.iconRanhu.className = 'iconfont icon-ranhu';

        _this.xiaoEMoBloodDom.appendChild(_this.xiaoEMoBloodBarDom);
        _this.body.appendChild(_this.xiaoEMoNameDom);
        _this.body.appendChild(_this.xiaoEMoBloodDom);
        _this.body.appendChild(_this.icon);
        _this.body.appendChild(_this.iconRanhu);
        app.appendChild(_this.body);

    }
    this.move = function () {
        _this.x += parseInt(Math.random() * 30) - parseInt(Math.random() * 30);
        _this.y += parseInt(Math.random() * 30) - parseInt(Math.random() * 30);
        //界限
        if (_this.y <= 80) {
            _this.y = 80;
        }
        if (_this.y >= 590) {
            _this.y = 5900;
        }
        if (_this.x <= 90) {
            _this.x = 90;
        }
        if (_this.x >= 900) {
            _this.x = 900;
        }
        _this.body.style.top = _this.x + 'px';
        _this.body.style.left = _this.y + 'px';
    }

    // 怪物技能
    this.skills = function () {
        //喷火
        //火焰随机方向
        let arr = [1, 2, 3, 4, 5, 6, 7, 8]; //动画
        let roundNum = Math.floor(Math.random() * 8);
        _this.iconRanhu.style.animation = `ranhu${arr[roundNum]} 1s infinite `
    }
    //怪物位移技能
    this.skillMove = function () {
        //随机位移
        _this.x = Math.round(Math.random() * 1000);
        _this.y = Math.round(Math.random() * 400);
        _this.body.style.left = _this.x + 'px';
        _this.body.style.top = _this.y + 'px';
    }
    //扣血
    this.downBlood = function (atker, code) {
        if (code == 74) {
            if ((atker.body.offsetLeft + atker.atkDistance + atker.body.offsetWidth) >= _this.body.offsetLeft & atker.body.offsetLeft - atker.body.offsetWidth - atker.atkDistance <= (_this.body.offsetLeft + _this.body.offsetWidth) & (atker.body.offsetTop + atker.atkDistance + atker.body.offsetHeight) >= _this.body.offsetTop & atker.body.offsetTop - atker.body.offsetHeight - atker.atkDistance <= (_this.body.offsetTop + _this.body.offsetHeight)) {
                console.log('打中了');
                _this.blood -= atker.atkNum;
                _this.xiaoEMoBloodBarDom.style.width = _this.blood + '%';
                if (_this.blood == 0) {
                    _this.body.style.display = 'none';
                }
            }
        }

    }


    //初始化
    this.init = function () {
        _this.create();
        setInterval(_this.move, 1000);
        setInterval(_this.skills, 1000);
        setInterval(_this.skillMove, 4000);
    }
    this.init();
}