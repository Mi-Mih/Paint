/**
 * Комментарии к глобальным переменным:
 * myColor    - актуальный цвет.
 * R          - радиус точки / толщина линии.
 * flag       - пока нужен только для нормальной работы функции linedraw (повторное определение точек).
 * mode_flag  - для смены режимов.
 * defImg     - дефолтный background холста (для очистки холста).
 */
var canvas      = document.getElementById('c1');
var ctx         =       canvas.getContext('2d');
var myColor     =                     '#000000';
var R           =                             5;
var defImg      =        new Image('holst.jpg');
var flag                                       ; 
var mode_flag                                  ; 






/**
 * Комментарии к функциям:
 * 
 * Готовы:
 * Функция для рисования линий и точек.
 * Функция очистить все.
 * Функция ластик.
 * Функция для рисования ломанной.
 * Функция для рисования окружности.
 * Функция для рисования овала.
 * Функция для рисования прямоугольника.
 * Функция для рисования квадрата.
 * Функция сохранения рисунка на компьютер
 */

 /**
  * Начальная заливка холста белым цветом (иначе считывает 
  * не черный цвет в функции пипетка и заливка вместо белого)
  */
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,900,600);

/**
 * Считывание значения ползунка.
 */
document.getElementById('lineWidth').oninput = function(){
	R = this.value;
}

/** 
 * Выбор цвета (считывание с виджета).
 */ 
document.getElementById('color').oninput = function(){
	myColor = this.value;
}

/**
 * ФУНКЦИЯ ОЧИСТИТЬ ВСЕ.
 * Переопределяем на дефолтные значения.
 */
function def(){
	ctx.clearRect(0,0,900,600);
   flag = true;
   mode_flag = false;
   ctx.fillStyle = "#ffffff";
   ctx.fillRect(0,0,900,600);

   defImg.onload = function () { 
      ctx.drawImage(defImg,0,0,900,600);
   }
}

/**
 * ФУНКЦИЯ СОХРАНИТЬ РИСУНОК.
 */
function saveImage(){
   const a = document.createElement("a");
   document.body.appendChild(a);
   a.href = canvas.toDataURL();
   a.download = "canvas-image/png";
   a.click();
   document.body.removeChild(a);
   console.log('you save the image');
}

/**
 * ФУНКЦИЯ СМЕНЫ РЕЖИМА НА ЗАЛИВКУ.
 */
function changeMode_fill(){
   mode_flag = true;
   console.log('change mod to fill');
}

/**
 * ФУНКЦИЯ СМЕНЫ РЕЖИМА НА ОБВОДКУ.
 */
function changeMode_stroke(){
   mode_flag = false;
   console.log('change mod to stroke');
}


/* *
 * ФУНКЦИЯ РИСОВАНИЯ ПО УМОЛЧАНИЮ. 
 * (чтобы не нажимать отдельную кнопку при запуске программы). 
 * Вспомнил, что когда кнопки "Линии" не было, функция была по умолчанию, решил так её и поставить.
 * Радиус R использован как толщина линии, он считывается с ползунка.
 * Вывод координат в консоль (console.log) (позже можно убрать).
 * canvas.onmousemove = null даёт возможность остановить рисование когда отпсукаешь мышку.
 * */
canvas.onmousedown = function(event){
   var x = event.offsetX;
   var y = event.offsetY;
   ctx.beginPath();
   ctx.arc(x, y, R, 0, 2 * Math.PI, true); 
   ctx.fillStyle = myColor ;
   ctx.fill();

   canvas.onmousemove = function(event){
      var x1 = event.offsetX;
      var y1 = event.offsetY;
      console.log('cor x:',' ',x,'cor y:',' ',y); 
      console.log('cor x1:',' ',x1,'cor y1:',' ',y1);
      ctx.beginPath();
      ctx.arc(x1, y1, R, 0, 2 * Math.PI, true); 
      ctx.fillStyle = myColor ;
      ctx.fill();
      ctx.closePath();
      
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x1,y1);
      ctx.lineWidth = 2*R;
      ctx.strokeStyle = myColor;
      ctx.stroke();
      x = x1;
      y = y1;
if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}
  
 }
}

canvas.onmouseup = function(){
   canvas.onmousemove = null; 
}

/**
 * ФУНКЦИЯ ЛИНИИ И ТОЧКИ.
 * Аналогично функции рисования по умолчанию.
 */
function draw(){

	canvas.onmousedown = function(event){
      var x = event.offsetX;
      var y = event.offsetY;
      ctx.beginPath();
      ctx.arc(x, y, R, 0, 2 * Math.PI, true); 
      ctx.fillStyle = myColor ;
      ctx.fill();

		canvas.onmousemove = function(event){
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         console.log('cor x:',' ',x,'cor y:',' ',y);
         console.log('cor x1:',' ',x1,'cor y1:',' ',y1);  
         ctx.beginPath();
         ctx.arc(x1, y1, R, 0, 2 * Math.PI, true); 
         ctx.fillStyle = myColor ;
         ctx.fill();
         ctx.closePath();

         ctx.beginPath();
         ctx.moveTo(x,y);
         ctx.lineTo(x1,y1);
         ctx.lineWidth = 2*R;
         ctx.strokeStyle = myColor;
         ctx.stroke();
         x = x1;
         y = y1;
if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}     


	 }  

      canvas.onmouseup = function(){
         canvas.onmousemove = null; 
      }
   }
}

/**
 * ФУНКЦИЯ ЛАСТИК. 
 * Аналогична функции линии и точки, но цвет const white.
 */
function eraser(){

	canvas.onmousedown = function(event){
      var x = event.offsetX;
	   var y = event.offsetY;
		ctx.beginPath();
      ctx.arc(x, y, R, 0, 2 * Math.PI, true);     
		ctx.fillStyle = "#ffffff" ;
      ctx.fill();
      	
		canvas.onmousemove = function(event){
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         console.log('cor x:',' ',x,'cor y:',' ',y);
         console.log('cor x1:',' ',x1,'cor y1:',' ',y1);
         ctx.beginPath();
         ctx.arc(x1, y1, R, 0, 2 * Math.PI, true);       
         ctx.fillStyle = "#ffffff" ;
         ctx.fill();	
         ctx.closePath();

         ctx.beginPath();
         ctx.moveTo(x,y);
         ctx.lineTo(x1,y1);
         ctx.lineWidth = 2*R;
         ctx.strokeStyle = "#ffffff";
         ctx.stroke();
         x = x1;
         y = y1;
      if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}
	  
	  
	  }  

      canvas.onmouseup = function(){
         canvas.onmousemove = null; 
      }	
   }
}

/**
 * ФУНКЦИЯ ДЛЯ ОТРИСОВКИ ОКРУЖНОСТИ.
 * dataURL - получение ссылки на изображение холста.
 * backgr - для сохранения изображения холста.
 * ctx.drawImage(backgr,0,0,900,600); отрисовка холста на "предыдущем шаге". 
 * dataURL = canvas.toDataURL(); (в onmousup) сохраняем холст и ссылку на его изображение для следующего рисования.
 */
function drawCircle(){
   
	canvas.onmousedown = function(event){
      var dataURL = canvas.toDataURL(); 
      var backgr = new Image(); 
      backgr.src = dataURL;
      console.log('save parametrs of canvas');
      var x = event.offsetX;
	   var y = event.offsetY;	
      
		canvas.onmousemove = function(event){
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         var r = Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
         console.log('cor x:',' ',x,'cor y:',' ',y);
         console.log('cor x1:',' ',x1,'cor y1:',' ',y1);
         
         ctx.beginPath();
         ctx.clearRect(0,0,900,600);
         ctx.drawImage(backgr,0,0,900,600);
         ctx.arc(x, y, r, 0, 2 * Math.PI, true);
         if (mode_flag){
            ctx.fillStyle = myColor;
            ctx.fill();
         } else {
            ctx.strokeStyle = myColor;
            ctx.lineWidth = 2*R;
            ctx.stroke();
         }
     if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}

 }
      
      canvas.onmouseup = function(){
         dataURL = canvas.toDataURL(); 
         backgr = new Image();
         backgr.src = dataURL;
         canvas.onmousemove = null; 
      }	
   }
}


/**
 * ФУНКЦИЯ ДЛЯ РИСОВАНИЯ ПРЯМОУГОЛЬНИКА.
 * Аналогична функции рисования окружности.
 * Рисование окружности заменено на рисование прямоугольника.
 */
function drawRect(){

	canvas.onmousedown = function(event){
      var dataURL = canvas.toDataURL(); 
      var backgr = new Image(); 
      backgr.src = dataURL;
      console.log('save parametrs of canvas');
		var x = event.offsetX;
      var y = event.offsetY;
      
      canvas.onmousemove = function(event){
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         var width = x1-x;
         var height = y1-y;
         ctx.beginPath();
         ctx.clearRect(0,0,900,600);
         ctx.drawImage(backgr,0,0,900,600);
         if (mode_flag){
            ctx.fillStyle = myColor;
            ctx.fillRect(x, y, width, height);
         } else {
            ctx.strokeStyle = myColor;
            ctx.lineWidth = 2*R;
            ctx.strokeRect(x, y, width, height);
         }
    if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}
	}
      
      canvas.onmouseup = function(){ 
         dataURL = canvas.toDataURL(); 
         backgr = new Image();
         backgr.src = dataURL;
         canvas.onmousemove = null; 
      }	
   }
}

/**
 * ФУНКЦИЯ ДЛЯ ОТРИСОВКИ ОВАЛА (ЭЛЛИПСА).
 * 
 */
function drawEllips(){

	canvas.onmousedown = function(event){
      var dataURL = canvas.toDataURL(); 
      var backgr = new Image(); 
      backgr.src = dataURL;
      console.log('save parametrs of canvas');
		var x = event.offsetX;
      var y = event.offsetY;
      
      canvas.onmousemove = function(event){
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         var width = Math.abs(x1-x);
         var height = Math.abs(y1-y);
         ctx.beginPath();
         ctx.clearRect(0,0,900,600);
         ctx.drawImage(backgr,0,0,900,600);
         ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI, true);
         if (mode_flag){
            ctx.fillStyle = myColor;
            ctx.fill();
         } else {
            ctx.strokeStyle = myColor;
            ctx.lineWidth = 2*R;
            ctx.stroke();
         }
      if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>895){
		  canvas.onmousemove = null;
}
	  }
      
      canvas.onmouseup = function(){ 
         dataURL = canvas.toDataURL(); 
         backgr = new Image();
         backgr.src = dataURL;
         canvas.onmousemove = null; 
      }	
   }
}

/**
 * ФУНКЦИЯ ДЛЯ ОТРИСОВКИ КВАДРАТА.
 * Аналогично функции для отрисовки прямоугольника+проверки
 */
function drawSquare(){
		
   canvas.onmousedown = function(event){
      var dataURL = canvas.toDataURL(); 
      var backgr = new Image(); 
      backgr.src = dataURL;
      console.log('save parametrs of canvas');
      var x = event.offsetX;
      var y = event.offsetY;	
   
      canvas.onmousemove = function(event){
        
		var x1 = event.offsetX;
         var y1 = event.offsetY;
         var width = x1-x;
         var height = y-y1;
if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>890){
		  canvas.onmousemove = null;
}



         if((y1-y<0) && (x1-x<0)){
            ctx.beginPath();
            ctx.clearRect(0,0,900,600);
            ctx.drawImage(backgr,0,0,900,600);
            if (mode_flag){
               ctx.fillStyle = myColor;
               ctx.fillRect(x, y, -Math.abs(width), -Math.abs(width));
            } else {
               ctx.strokeStyle = myColor;
               ctx.lineWidth = 2*R;
               ctx.strokeRect(x, y, -Math.abs(width), -Math.abs(width));
            }
         } 
		 
		   if((y1-y<0) && (x1-x>0)){
            ctx.beginPath();
            ctx.clearRect(0,0,900,600);
            ctx.drawImage(backgr,0,0,900,600);
            if (mode_flag){
               ctx.fillStyle = myColor;
               ctx.fillRect(x, y, Math.abs(width), -Math.abs(width));
            } else {
               ctx.strokeStyle = myColor;
               ctx.lineWidth = 2*R;
               ctx.strokeRect(x, y, Math.abs(width), -Math.abs(width));
            }
         } 
		 
		   if((y1-y>0) && (x1-x>0)){
            ctx.beginPath();
            ctx.clearRect(0,0,900,600);
            ctx.drawImage(backgr,0,0,900,600);
            if (mode_flag){
               ctx.fillStyle = myColor;
               ctx.fillRect(x, y, Math.abs(width), Math.abs(width));
            } else {
               ctx.strokeStyle = myColor;
               ctx.lineWidth = 2*R;
               ctx.strokeRect(x, y, Math.abs(width), Math.abs(width));
            }
         } 
    
         if((y1-y>0) && (x1-x<0)){
            ctx.beginPath();
            ctx.clearRect(0,0,900,600);
            ctx.drawImage(backgr,0,0,900,600);
            
            if (mode_flag){
               ctx.fillStyle = myColor;
               ctx.fillRect(x, y, -Math.abs(width), Math.abs(width));
            } else {
               ctx.strokeStyle = myColor;
               ctx.lineWidth = 2*R;
               ctx.strokeRect(x, y, -Math.abs(width), Math.abs(width));
            }
         
		 
} 
}
      
	   canvas.onmouseup = function(){
         dataURL = canvas.toDataURL(); 
         backgr = new Image();
         backgr.src = dataURL;
         canvas.onmousemove = null; 
      }	
   }
}

/**
 * ФУНКЦИЯ ДЛЯ РИСОВАНИЯ ЛОМАННОЙ.
 * flag здесь нужен для рисования от последних координат. 
 */
function linedraw(){
	flag = true;
   var x;
   var y;

   canvas.onmousedown = function(event){
     var dataURL = canvas.toDataURL(); 
      var backgr = new Image(); 
      backgr.src = dataURL;
	 
	 if (flag){
         x = event.offsetX;
         y = event.offsetY;
         console.log('x: ',x,'y: ',y);
      } else {
         var x1 = event.offsetX;
         var y1 = event.offsetY;
         
		 console.log('x1: ',x1,'y1: ',y1);
         ctx.beginPath();
         ctx.moveTo(x,y);
         ctx.lineTo(x1,y1);
         ctx.lineWidth = 2*R;
         ctx.strokeStyle = myColor;
         ctx.stroke();
         ctx.closePath();
         
         ctx.beginPath();
         ctx.arc(x, y, R, 0, 2 * Math.PI, true);
         ctx.arc(x1, y1, R, 0, 2 * Math.PI, true);
         ctx.fillStyle = myColor;
         ctx.fill();	
         x = x1;
         y = y1;
      }
      canvas.onmousemove = function(event){
       var x1 = event.offsetX;
       var y1 = event.offsetY;
	  console.log('x: ',x1,'y: ',y1);
	  ctx.beginPath();
        ctx.clearRect(0,0,900,600);
         ctx.drawImage(backgr,0,0,900,600);
		ctx.moveTo(x,y);
         ctx.lineTo(x1,y1);
         ctx.lineWidth = 2*R;
         ctx.strokeStyle = myColor;
         ctx.stroke();
         ctx.closePath();
		 ctx.beginPath();
         ctx.arc(x, y, R, 0, 2 * Math.PI, true);
         ctx.arc(x1, y1, R, 0, 2 * Math.PI, true);
         ctx.fillStyle = myColor;
         ctx.fill();	
         
if(y1>599){
		  canvas.onmousemove = null;
}
if(x1<1){
		  canvas.onmousemove = null;
}
if(y1<1){
		  canvas.onmousemove = null;
}

if(x1>890){
		  canvas.onmousemove = null;
}
	  }
	  
	  canvas.onmouseup = function(){
       
    	  dataURL = canvas.toDataURL(); 
         backgr = new Image();
         backgr.src = dataURL;
         canvas.onmousemove = null; 
		 }	
   }
}

/**
 * ФУНКЦИЯ ПИПЕТКА.
 * При нажатии считывает с координат мышки цвет пикеля в формате rgb.
 * Устанавливает считанный цвет пикселя в качестве текущего.
 */
function pipette(){
   canvas.onmousedown = function(event){
      var x = event.offsetX;
      var y = event.offsetY;
      var pix_data = ctx.getImageData(x,y,1,1).data;
      var rgb_base = 'rgb(' + pix_data[0] + ','+ pix_data[1] + ','+ pix_data[2] +')';
      var r_rgb = pix_data[0];
      var g_rgb = pix_data[1];
      var b_rgb = pix_data[2];
      myColor = 'rgb('+r_rgb+','+g_rgb+','+b_rgb+')';
      console.log(rgb_base);
   }
}

/**
 * ФУНКЦИЯ ЗАЛИВКА.
 */
function filling(){
   canvas.onmousedown = function(event){
      var x = event.offsetX;
      var y = event.offsetY;
      var pix_data = ctx.getImageData(x,y,1,1).data;

      function rgb_hex(r, g, b){
         return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      var boardColor = rgb_hex(pix_data[0], pix_data[1], pix_data[2]); 
      var stack = [[x,y]];
      var pixel;
      ctx.fillStyle = myColor;

      while (stack.length > 0){
         pixel = stack.pop();
         if (pixel[0] < 0 || pixel[0] >= 900){
             continue;}
         if (pixel[1] < 0 || pixel[1] >= 600){
             continue;}

         pix_data = ctx.getImageData(pixel[0], pixel[1], 1,1).data;
         pixColor = rgb_hex(pix_data[0], pix_data[1], pix_data[2]);

         if (pixColor == boardColor && pixColor !== myColor){
            ctx.fillRect(pixel[0]-1,pixel[1]-1,3,3);

            stack.push([      
               pixel[0] -2,
               pixel[1]
            ]);
            stack.push([      
               pixel[0] +2,
               pixel[1]
            ]);
            stack.push([      
               pixel[0],
               pixel[1] -2
            ]);
            stack.push([      
               pixel[0],
               pixel[1] +2
            ]);
         } 
      }
   }

}