import vue from 'vue'

import pop from './pop.vue'

const popConstructor = vue.extend(pop);
let popDom;
export default {
   show: function (){
        if(popDom){
            console.log('haspopDom')
            return
        }
       return new Promise((resolve,reject)=>{
            popDom = new popConstructor({
               el:document.createElement('div'),

           })
           popDom.showpop().then(()=>{
               resolve()
           })
           document.body.appendChild(popDom.$el)
       })
   },
   close:function(){
       if(popDom){
           popDom.closepop()
           document.body.removeChild(popDom.$el)
       }
   }

}