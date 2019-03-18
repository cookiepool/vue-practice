import vue from 'vue'
import loaddingComponent from './loadding.vue'

const loadding = vue.extend(loaddingComponent)
let instance

    //抛出的方法
    export default {
        //显示loadding
        open(options = {}){
            if(!instance){
                //实例化loadding.vue
                instance = new loadding({
                    el: document.createElement('div')
                })
            }
            if(instance.show) return;  
            instance.content = typeof options === 'string'? options : ''
            //将实例添加到body中
            document.body.appendChild(instance.$el);
                instance.show = true
        },
        //隐藏loadding
        close() {
            if (instance) {
                instance.show = false;
            }
        }
    
    }
