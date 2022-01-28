
function ImageManager(splitsX,splitsY) {
  let imagePieces = [];
  let key = 0;
  for(let i =1; i<=splitsX; i++) {
    for(let j = 1; j<=splitsY; j++ ) {
        let imagePiece = {}
        let code = 'part' + i + j;
        imagePiece['drag'] = this.drag;
        imagePiece['id'] = code;
        imagePiece['class'] = 'img'
        imagePiece['outerClass'] = 'img-box'
        imagePiece['src'] = 'images/' + code +'.png';
        imagePiece['key'] = key
        imagePieces.push(imagePiece);
        key++;
      }
    }
    return imagePieces;
}

function BoxManager(splitsX,splitsY) {
  let boxes = [];
  let key = 0;
  for(let i =1; i<=splitsX; i++) {
    for(let j = 1; j<=splitsY; j++ ) {
        let box = {}
        let code = 'box' + i + j;
        box['allowDrop'] = this.allowDrop;
        box['drop'] = this.drop;
        box['id'] = code;
        box['class'] = 'box'
        box['key'] = key
        boxes.push(box);
        key++;
      }
    }
    return boxes;

}



function shuffleArray(array) {
     let shuffledArray = [];
      while(array.length != 0) {
       let randomNumber = Math.floor(Math.random()*(array.length - 1));
       shuffledArray.push(array[randomNumber]);
       array = array.filter(e => e != array[randomNumber]);
     }
     return shuffledArray;
}


function setup(splitsX,splitsY) {
    this.imageList = shuffleArray(ImageManager(splitsX,splitsY))
    this.boxes = BoxManager(splitsX,splitsY);


}

function drag(ev) {
  ev.dataTransfer.setData('imgId', ev.target.id);
}

function allowDrop(ev){
  ev.preventDefault();
}


function drop(ev,id) {
  ev.preventDefault();
  var data = byId(ev.dataTransfer.getData('imgId'))
  byId(id).appendChild(data)
}

function drag(ev) {
  ev.dataTransfer.setData('imgId', ev.target.id);
}

function allowDrop(ev){
  ev.preventDefault();
}


function drop(ev,id) {
  ev.preventDefault();
  var data = byId(ev.dataTransfer.getData('imgId'))
  byId(id).appendChild(data)
}

function byId(id) {
  return document.getElementById(id);
}



data = {
    a: 0,
    imageList: [],
    boxes:[],
}




methods = {
   setup:setup,
   drag:drag,
   allowDrop:allowDrop,
   drop:drop,
}


Vue.component('piece',{
   props:['pieceInfo'],
     template: `
      <div v-bind:class = pieceInfo.outerClass>
      <img  v-bind:src = pieceInfo.src v-bind:id = pieceInfo.id
      v-bind:class = pieceInfo.class  @dragstart="pieceInfo.drag($event)">
      </div>
     `
})

Vue.component('box', {
  props:['boxInfo'],
  template: `
   <div v-bind:id = boxInfo.id v-bind:class = boxInfo.class @drop = boxInfo.drop($event,boxInfo.id) @dragover = boxInfo.allowDrop($event)></div>
  `
})


var app = new Vue({el:'#app',data,methods})
