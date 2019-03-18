import vue from 'vue'

import pop from './submit_pop.vue'
import { throws } from 'assert';

const popConstructor = vue.extend(pop);
let popDom;
export default {
   show: function (obj){
    if(typeof(obj)!=='object'){
        throw console.error(请传入对象);
        return
    }
       return new Promise((resolve,reject)=>{
            popDom = new popConstructor({
               el:document.createElement('div'),
                data() {
                    return {
                        name:obj.name,
                        rank:obj.rank,
                        icon:obj.icon
                    }
                }
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
       }
   }

}