let canvasWrapper = document.querySelector('.canvasWrapper');

let canvas = document.querySelector('#canvas')

let ctx = canvas.getContext('2d');

let lineWidth = 10

let eraNode
// 单例

let editEraser = false

let flay = false

pen.onclick = function () {

  editEraser = false

  this.classList.add('active')

  eraser.classList.remove('active')

}
eraser.onclick = function () {

  editEraser = true

  this.classList.add('active')

  pen.classList.remove('active')

}

red.onclick = function () {

  ctx.strokeStyle = 'red'

  this.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');

}
blue.onclick = function () {

  ctx.strokeStyle = 'blue'

  this.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');

}
green.onclick = function () {

  ctx.strokeStyle = 'green'

  this.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');

}

big.onclick = function () {
  lineWidth = 5

}
small.onclick = function () {


  lineWidth = 10

}

download.onclick = function () {

  let dataUrl = canvas.toDataURL()

  let a = document.createElement('a');

  a.href = dataUrl

  a.download = '我的画'

  document.body.appendChild(a)

  a.click()

  a.remove()
}

waste.onclick = function () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function beforeDrawing() {
  let last = []
  let erX = eraser.clientWidth / 2;
  let erY = eraser.clientHeight / 2;
  if ('ontouchstart' in document) {

    canvasWrapper.addEventListener('touchstart', function (event) {

      flay = true
     
      last=[event.touches[0].clientX, event.touches[0].clientY] //收集画板初始触点
      
    
      
      if (editEraser) {

        ctx.clearRect(last[0], last[1], 10, 10); //怎么擦除

        createEraser()

        eraNode.style.left = last[0] - erX + 'px'
        eraNode.style.top = last[1] - erY + 'px'
      }

    })

    canvasWrapper.addEventListener('touchmove', function (event) {

      if (!flay) return

      let x = event.touches[0].clientX;

      let y = event.touches[0].clientY;
      //收集画板初始触点

      if (editEraser) {

        ctx.clearRect(x, y, 10, 10); //怎么擦除

        eraNode.style.left = x - erX + 'px'
        
        eraNode.style.top = y - erY + 'px'

      } else {
        //让画笔的起点为上一个事件的坐标

        beginDraw(last[0], last[1], x, y)  
       
        last = [x, y]

       
        
      }

    })

    canvasWrapper.addEventListener('touchend', function (event) {

      flay = false

      removeEraser()

      

    })



  } else {


    canvasWrapper.onmousedown = function (event) {


      flay = true

      last = [event.clientX, event.clientY]

      if (editEraser) {

        ctx.clearRect(last[0], last[1], 10, 10); //怎么擦除

        createEraser()

        eraNode.style.left = last[0] - erX + 'px'
        eraNode.style.top = last[1] - erY + 'px'
      }



    }
    canvasWrapper.onmousemove = function (event) {

      if (!flay) return

      let x = event.clientX
      let y = event.clientY

      if (editEraser) {
        ctx.clearRect(x, y, 10, 10); //怎么擦除
        eraNode.style.left = x - erX + 'px' //控制橡皮擦的位置
        eraNode.style.top = y - erY + 'px'

      } else {
        beginDraw(last[0], last[1], x, y)
        last = [x, y]
      }

    }
    canvasWrapper.onmouseup = function (event) {

      flay = false
      removeEraser()

    }
  }



}

beforeDrawing()

autoRsizeWin()

//添加橡皮擦
function createEraser() {

  if (eraNode) return

  eraNode = eraser.cloneNode(true)

  eraNode.id = ''

  eraNode.classList.add('eraser')

  canvasWrapper.appendChild(eraNode)
}
//删除橡皮擦
function removeEraser() {

  if (!eraNode) return

  canvasWrapper.removeChild(eraNode);

  eraNode = false

}
//调整画板大小
function autoRsizeWin() {

  setWin()

  window.onresize = () => {
    setWin()
  }

  function setWin() {

    canvas.width = document.documentElement.clientWidth

    canvas.height = document.documentElement.clientHeight
  }
}

function beginDraw(x1, y1, x, y) {

  ctx.beginPath();

  ctx.moveTo(x1, y1);

  ctx.lineWidth = lineWidth

  ctx.lineCap = 'round';

  ctx.lineTo(x, y);

  ctx.stroke();

  ctx.closePath()
}