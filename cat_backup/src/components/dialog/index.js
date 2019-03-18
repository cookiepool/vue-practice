import vue from 'vue'
import dialog from './dialog.vue'

const dialog_vue = vue.extend(dialog)
let instance

export default {
    show(title = {},content = {}){
        instance = new dialog_vue({
            el: document.createElement('div'),
        })
        document.body.appendChild(instance.$el);
        instance.title = typeof title === 'string'? title : '';
        instance.content = typeof content === 'string'? content : '';
        console.log(content);
        instance.show = true;
    }
}
