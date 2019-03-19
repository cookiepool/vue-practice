import Vue from 'vue';
import LoadingToast from './Loading.vue';

//使用构造器
const loading = Vue.extend(LoadingToast);
let instance; //定义一个实例变量，用来初始化

export default {
    open: function(options = {}){
        if(!instance){
            instance = new loading({
                el: document.createElement('div')
            })
        }
        if(instance.show) return;
        instance.content = typeof options === 'string' ? options : '';
        document.body.appendChild(instance.$el);
        instance.show = true;
    },
    close: function(){
        if(instance){
            instance.show = false;
        }
    }
}