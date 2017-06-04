
$(function(){
  var layout=document.querySelector('.layout');
  //��ǰ�л���ҳ��
  var pageNum=1;
  //��¼�û����������Ƿ���Ч
  var isMove=false;


  //2��loadҳ�涯����ɵ��¼�
  //��ֹ��Ԫ�ص��¼�ð��
  $('.loading>*').on('webkitAnimationEnd',function(e){
    e.stopPropagation();
  })

  //����ҳ������¼�
  $('.loading').on('webkitAnimationEnd',function(e){
    $(this).css('transform','translate3d(0px,-'+$(window).height()+'px,0px) ');
    $('.view').eq(1).addClass('active');
    isMove=true;
  })



  /*
  * ���»�������һ������
  * ���ϻ���  ������ȥ
  * */
  var starY=0;
  var moveY=0;
  var distanceY=0;
  var direction='none';
  //������ʼ ��¼������ʼ��λ��
  layout.addEventListener('touchstart',function(e){
    starY= e.targetTouches[0].clientY;
  })
  //�����ƶ�
  layout.addEventListener('touchmove',function(e){
    //alert(1);
    //����ҳ�����غ� �û����ܿ�ʼ����
    if(!isMove){
      return;
    }

    moveY= e.targetTouches[0].clientY;
    distanceY=moveY-starY;
    console.log(pageNum);

      //���ϻ��� �������ǵ�ǰҳ
      if(distanceY<=0&&direction!='down'&&pageNum<8){
        if(pageNum!=1&&pageNum!=4) {
          $('.view').eq(pageNum).css('top',distanceY);
        }
        if(distanceY<0&&direction=='none'){
          direction='up';
        }
        // ���»��� ����������һҳ
      }else if(distanceY>0&&direction!="up"&&pageNum>1){
        if(pageNum!=1) {
          $('.view').eq(pageNum-1).css('top',-$(window).height()+distanceY);
        }

        if(distanceY>0&&direction=='none'){
          direction='down';
        }
      }
  })
  //��������
  layout.addEventListener('touchend',function(){
      console.log(direction);
      //�����û����������ķ��� ִ������ҳ����

      if(direction=="up"){
        // �������ǵ�ǰҳ
        //��һҳ�������� ���������� ��������������
        if(pageNum==1){
          page1();
        }else if(pageNum==4){
         //����ҳ��������
          isMove=false;
         //�������������� ������
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

          //������ɺ� ִ������

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
      //����������һҳ
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

  //��������
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


  //�����ʼ��ť
  $('.start').click(function(){
    $(this).find('.start-btn').css('background-image','url(images/page1/bear-btn-aft.png)');
    page1();
    pageNum++;
    direction='none';
  });


  var page1=function(){
    isMove=false;
    //��ֹ�¼�ð��
    $('.page1>*').on('animationend',function(e){
      e.stopPropagation();
    });
    //ִ�ж���
    $('.rider2-in').css('animation','rider2drive 1s forwards ');
    $('.view').eq(pageNum).css('animation','fadeout 0.3s  0.7s forwards');
    $('.start').css('display','none');
    //������Ƶ
    $('audio').get(0).play();
    $('.music').css('background-image','url(images/play.png)');

    $('.page1').on('animationend',function(){
      $(this).animate({'top':-$(window).height()*(pageNum)},300,function(){
        $('.view').eq(pageNum).addClass('active').siblings().removeClass('active');
      });
    })
    //�ѳ������������
    $('.rider2-in').on('animationend',function(){
      $('.rider2-in').css('animation','rider2jump .5s 0s linear infinite');
      $('.start').css('display','block');
      isMove=true;
    })

  }

  //��Ƶ����
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
