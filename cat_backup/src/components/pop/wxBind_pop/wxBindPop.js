import vue from 'vue'
import pop from './wxBindPop.vue'
const popConstructor = vue.extend(pop);
let popDom;
export default {
   show: function (){
       return new Promise((resolve,reject)=>{
            popDom = new popConstructor({
               el:document.createElement('div'),
               data() {
                    return {
                        show:true,
                    }   
                }
           })
           popDom.showpop()
           .then(()=>{
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