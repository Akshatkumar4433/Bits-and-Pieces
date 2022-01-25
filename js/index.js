function byId(id) {
  return document.getElementById(id);
}

data = {
    a: 0,
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

var app = new Vue({el:'#app',data, methods})
