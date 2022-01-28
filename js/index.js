
function ImageManager(splitsX,splitsY) {
  let imagePieces = [];
  let key = 0;
  for(let i =1; i<=splitsX; i++) {
    for(let j = 1; j<=splitsY; j++ ) {
        let imagePiece = {}
        let code = 'part' + i + j;
        imagePiece['id'] = code;
        imagePiece['class'] = 'img'
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

function byId(id) {
  return document.getElementById(id);
}



data = {
    a: 0,
    imageList: [],
    boxes:[],
}




methods = {
   allowDrop(ev){
     ev.preventDefault();
   },
   drag(ev) {
     ev.dataTransfer.setData('imgId', ev.target.id);
   },
   drop(ev) {
     ev.preventDefault();
     var data = byId(ev.dataTransfer.getData('imgId'))
     data.style.marginTop = ev.offsetY + 'px';
     data.style.marginLeft = ev.offsetX + 'px';
     data.style.marginRight = ev.offsetX + 'px';
     data.style.marginBottom = ev.offsetY + 'px';
   },
   setup:setup,
}


Vue.component('piece',{
     methods:{drag(ev) {
       ev.dataTransfer.setData('imgId', ev.target.id);
     },},
     props:['pieceInfo'],
     template: `
      <img v-bind:src = pieceInfo.src v-bind:id = pieceInfo.id
      v-bind:class = pieceInfo.class  @dragstart="drag($event)">
     `
})

Vue.component('box', {
  methods: {
    allowDrop(ev){
      ev.preventDefault();
    },
    drop(ev,id) {
      ev.preventDefault();
      var data = byId(ev.dataTransfer.getData('imgId'))
      byId(id).appendChild(data)
      /*
      data.style.marginTop = ev.offsetY + 'px';
      data.style.marginLeft = ev.offsetX + 'px';
      data.style.marginRight = ev.offsetX + 'px';
      data.style.marginBottom = ev.offsetY + 'px';
      */
    },
  },
  props:['boxInfo'],
  template: `
   <div v-bind:id = boxInfo.id v-bind:class = boxInfo.class @drop = 'drop($event,boxInfo.id)' @dragover = 'allowDrop($event)'></div>
  `
})


var app = new Vue({el:'#app',data,methods})
