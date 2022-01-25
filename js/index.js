

data = {
    a: 0,
}

methods = {
   dragImage(state,event){
      console.log(event.offsetX)
      console.log(event.offsetY)
      if (state == 'up') {
        console.log('ok')
     }
     if (state == 'down') {
       console.log('why')

     }
   },
}

var app = new Vue({el:'#app',data, methods})
