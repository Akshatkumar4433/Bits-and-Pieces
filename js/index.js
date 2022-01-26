//Fix Vue methods

function ImageManager(splitsX,splitsY) {
    let imagePieces = [];
    let key = 0;
    for(let i =1; i<=splitsX; i++) {
      for(let j = 1; j<=splitsY; j++ ) {
          let imagePiece = {}
          imagePiece['id'] = 'img';
          imagePiece['src'] = 'images/' +'part' + i + j+'.png';
          imagePiece['key'] = key
          imagePieces.push(imagePiece);
          key++;
      }
    }
    return imagePieces;
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


function byId(id) {
  return document.getElementById(id);
}



data = {
    a: 0,
    imageList: shuffleArray(ImageManager(3,3)),
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
   }
}


Vue.component('piece',{
     methods:{drag(ev) {
       ev.dataTransfer.setData('imgId', ev.target.id);
     },},
     props:['pieceInfo'],
     template: `
      <img v-bind:src = pieceInfo.src v-bind:id = pieceInfo.id @dragstart="drag($event)">
     `
})

//var app = new Vue({el:'#app',data, methods})
var app = new Vue({el:'#app',data,methods})
