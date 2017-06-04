
$(function(){
  var layout=document.querySelector('.layout');
  //当前切换的页码
  var pageNum=1;
  //记录用户滑动操作是否有效
  var isMove=false;


  //2、load页面动画完成的事件
  //阻止子元素的事件冒泡
  $('.loading>*').on('webkitAnimationEnd',function(e){
    e.stopPropagation();
  })

  //加载页面完成事件
  $('.loading').on('webkitAnimationEnd',function(e){
    $(this).css('transform','translate3d(0px,-'+$(window).height()+'px,0px) ');
    $('.view').eq(1).addClass('active');
    isMove=true;
  })



  /*
  * 向下滑动，上一张下来
  * 向上滑动  本章上去
  * */
  var starY=0;
  var moveY=0;
  var distanceY=0;
  var direction='none';
  //触屏开始 记录触屏开始的位置
  layout.addEventListener('touchstart',function(e){
    starY= e.targetTouches[0].clientY;
  })
  //触屏移动
  layout.addEventListener('touchmove',function(e){
    //alert(1);
    //加载页面隐藏后 用户才能开始滑动
    if(!isMove){
      return;
    }

    moveY= e.targetTouches[0].clientY;
    distanceY=moveY-starY;
    console.log(pageNum);

      //向上滑动 滑动的是当前页
      if(distanceY<=0&&direction!='down'&&pageNum<8){
        if(pageNum!=1&&pageNum!=4) {
          $('.view').eq(pageNum).css('top',distanceY);
        }
        if(distanceY<0&&direction=='none'){
          direction='up';
        }
        // 向下滑动 滑动的是上一页
      }else if(distanceY>0&&direction!="up"&&pageNum>1){
        if(pageNum!=1) {
          $('.view').eq(pageNum-1).css('top',-$(window).height()+distanceY);
        }

        if(distanceY>0&&direction=='none'){
          direction='down';
        }
      }
  })
  //触屏结束
  layout.addEventListener('touchend',function(){
      console.log(direction);
      //根据用户触屏操作的方向 执行上下页切屏

      if(direction=="up"){
        // 操作的是当前页
        //第一页单独处理 触屏滑动后 先做动画在切屏
        if(pageNum==1){
          page1();
        }else if(pageNum==4){
         //第四页单独处理
          isMove=false;
         //第四屏先做动画 在切屏
          setTimeout(function(){
            $('.license').attr('src','images/page4/license1.png');
            $('.bear3-1').addClass('bear3-2');
          },500);
          setTimeout(function(){
            $('.oil').attr('src','images/page4/oil1.png');
            $('.bear3-1').addClass('bear3-3');
          },1000);
          setTimeout(function(){
            $('.evil').attr('src','images/page4/evil21.png');
            $('.bear3-1').addClass('bear3-4');
          },1500);
          setTimeout(function(){
            $('.bear3-1').removeClass('bear3-2 bear3-3 bear3-4')
          },1800)

          $('.oil').addClass('breakdown');
          $('.evil').addClass('breakdown')
          $('.license').addClass('breakdown');

          //动画完成后 执行切屏

          $('.oil').on('webkitAnimationEnd',function(){

            $('.page4').animate({'top':-$(window).height()},300,function(){
              $('.view').eq(pageNum).addClass('active').siblings().removeClass('active');
              $('.license').removeClass('breakdown').attr('src','images/page4/license.png');
              $('.oil').removeClass('breakdown').attr('src','images/page4/oil.png');
              $('.evil').removeClass('breakdown').attr('src','images/page4/evil2.png');
              isMove=true;
            });
          });

        }else{
          $('.view').eq(pageNum).animate({'top':-$(window).height()},300,function(){
            $('.view').eq(pageNum).addClass('active').siblings().removeClass('active');
          });
        }
        pageNum++;
      }


    if(direction=="down"){
      //操作的是上一页
      pageNum--;
      $('.view').eq(pageNum).animate({'top':0},300,function(){
        $('.view').eq(pageNum).addClass('active').siblings().removeClass('active');
      });
    }
    direction='none';
    if(pageNum==6){
      setWeather();
    }
  })

  //设置天气
  function setWeather(){
    var w=$(window).width();
    console.log(w);
    var min=w/4;
    $('.weather div').each(function(index,e){
        $(e).css('left',(min+Math.random()*w)/32+'rem');
        if(Math.random()*2>1.3){
          $(e).css('z-index',5);
        }
      console.log((min+Math.random()*w)/32);
    });
  }


  //点击开始按钮
  $('.start').click(function(){
    $(this).find('.start-btn').css('background-image','url(images/page1/bear-btn-aft.png)');
    page1();
    pageNum++;
    direction='none';
  });


  var page1=function(){
    isMove=false;
    //阻止事件冒泡
    $('.page1>*').on('animationend',function(e){
      e.stopPropagation();
    });
    //执行动画
    $('.rider2-in').css('animation','rider2drive 1s forwards ');
    $('.view').eq(pageNum).css('animation','fadeout 0.3s  0.7s forwards');
    $('.start').css('display','none');
    //播放音频
    $('audio').get(0).play();
    $('.music').css('background-image','url(images/play.png)');

    $('.page1').on('animationend',function(){
      $(this).animate({'top':-$(window).height()*(pageNum)},300,function(){
        $('.view').eq(pageNum).addClass('active').siblings().removeClass('active');
      });
    })
    //把出场动画清除掉
    $('.rider2-in').on('animationend',function(){
      $('.rider2-in').css('animation','rider2jump .5s 0s linear infinite');
      $('.start').css('display','block');
      isMove=true;
    })

  }

  //音频控制
  $('.music').click(function(){
    var audio=$('audio').get(0);
    if(audio.paused){
      audio.play();
      $(this).css('background-image','url(images/play.png)');
    }else{
      audio.pause();
     $(this).css('background-image','url(images/pause.png)');
    }
  });


})
