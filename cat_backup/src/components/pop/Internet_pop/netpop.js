import vue from 'vue'

import pop from './netpop.vue'

const popConstructor = vue.extend(pop);
let popDom;
export default {
    //显示
    show: function (param){
        if(popDom)  return;
        console.log('show')
        return new Promise((resolve,reject)=>{
            var msg = param||''
            popDom = new popConstructor({
                el:document.createElement('div'),
                data(){
                    return {
                        msg:msg
                    }
                }
            })
            document.body.appendChild(popDom.$el)
            popDom.showpop().then(()=>{
                document.body.removeChild(popDom.$el)
                popDom = ''
                resolve()
            })
        })
    },
    //关闭
    close:function(){
        if(popDom){
            return new Promise((resolve,reject)=>{
                popDom.closepop()
                document.body.removeChild(popDom.$el)
                resolve()
            })
        }
    }

}