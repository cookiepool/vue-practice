import vue from 'vue'

import pop from './pop.vue'

const popConstructor = vue.extend(pop);
let popDom;
export default {
   show: function (version,content,update,down_url){
        if(popDom){
            console.log('haspopDom')
            return
        }
       return new Promise((resolve,reject)=>{
            popDom = new popConstructor({
               el:document.createElement('div'),
               data() {
                    return {
                        show:true,
                        version:version,
                        content:content,
                        update:update,
                        down_url:down_url
                    }   
                }
           })
           popDom.showpop(content)
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