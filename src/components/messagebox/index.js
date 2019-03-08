import Vue from 'vue';
import MsgBox from './MessageBox.vue';

var msgbox_cons = Vue.extend(MsgBox);
var instance;
export default {
    showIt(title, content){
        instance = new msgbox_cons({
            el: document.createElement('div')
        });
        console.log(instance);
        document.body.appendChild(instance.$el);
        instance.title = title;
        instance.content = content;
        instance.show = true;
    }
}