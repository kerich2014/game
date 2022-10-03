var image_directory = "";//расположение фото
var ok = false;
var pcbusy = false;
var userturn = true;
var butdown = false;
var stage = 1;
var cnt = 1;

var pcclicks = new Array();//clicks PC
var userclicks = new Array();//cliks Users

var pos;
var tst = true;
var msg = "Нажмите на кнопку!";

btn1 = new Image();
btn1.src = image_directory + "purple.jpg";
btn2 = new Image();
btn2.src = image_directory + "yellow.jpg";


function updown(isdn)
{
  if (isdn)
    {
      document.form[('pl'+pos)].src = image_directory + 'yellow.jpg';
    }
  else
    {
     document.form[('pl'+pos)].src= image_directory + 'purple.jpg';
    }
}

function rn()//рандомайзер
{
  pos = Math.floor((Math.random() * 100) + 1);
  updown(true);
}

function rn2()//рандомайзер 2
{
  updown(false);
  pcclicks[cnt] = pos;
  cnt++;
  dopc();
}

function dopc() // ход ПК
{
  document.form.level.value = stage;
  if (cnt <= stage)
    {
      pcbusy = true;
      userturn = false;
      document.form.message.value = "Обработка данных...";
      setTimeout(rn,500);
      setTimeout(rn2,1500);
    }
  else
    {
      userclicks = new Array(); // ход игрока
      cnt = 1;
      document.form.message.value = "Ваша очередь ходить...";
      pcbusy = false;
      userturn = true;
      document.form.start.focus();
    }
}
function testclicks() //проверка и вывод сообщений
{
  tst = true;
  for(i = 1;cnt > i; i++)
    {
    /*  console.log(cnt);
      console.log("PC:" + pcclicks);*/
      if (pcclicks[i] == userclicks[i])
        {
          tst = true && tst;
        }
      else
        {
          tst = false && tst;
        }
    }
  if(tst)
    {
      setTimeout("stage++ ; document.form.message.value=stage ; alert('ПРАВИЛЬНО!  Переход на следующий уровень....'); document.form.message.value=msg ; document.form.start.focus()",300);
    }
  else
    {
      setTimeout("stage=1 ; cnt=1 ; pcclicks=new Array() ; document.form.message.value=stage ; alert('ОШИБКА!.  Вам прийдется начать новую игру.') ; document.form.message.value=msg",300);
    }
  cnt = 1;
}
function testclk(downflag, pos) // ...
{
  if (userturn&&(!pcbusy))
    {
      if (downflag)
        {
          document.form[('pl'+pos)].src = image_directory + 'yellow.jpg';
        }
      else
        {
          document.form[('pl'+pos)].src = image_directory + 'purple.jpg';
        }
      if (ok && !downflag)
        {
          userclicks[cnt] = pos;
        //  console.log("--> " + userclicks);
          cnt++;
          if (pcclicks.length == userclicks.length)
            {
              testclicks();
            }
        }
    }
}
