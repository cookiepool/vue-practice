import vue from 'vue'
import toastComponent from './messageBox.vue'
//返回一个扩展实例构造器
const MessageBoxConstructor = vue.extend(toastComponent)

    //定义弹出组件的函数 接收1个参数要显示的文本
    export default{
        alert: function(content,title,obj){
            //实例化一个toast.vue
            var myobj={confirmButtonText:'',cancelBtn:''};
            if(obj=== undefined || obj === null){
                myobj = {confirmButtonText:'确定'}
            }else if(typeof(obj)==='object'){
                myobj.confirmButtonText = obj.confirmButtonText||'确定';
                myobj.cancelBtn = obj.cancelBtn||false
            }
            if(typeof(title)!='string'){
                if(typeof(title)==='object'){
                    myobj.confirmButtonText = title.confirmButtonText||'确定';
                    myobj.cancelBtn = title.cancelBtn||false
                    console.log(myobj);
                }
                title=false
            }
            return new Promise((resolve,reject) => {
                const messageDom = new MessageBoxConstructor({
                    el: document.createElement('div'),
                    data() {
                        return {
                            alertTitle:title||'提示',
                            alert_text:content,
                            alertShow:false,
                            confirmButtonText:myobj.confirmButtonText,
                            cancelBtn:myobj.cancelBtn,
                        }
                    }
                })
                //把实例化的toast.vue 添加到body里
                messageDom.showAlert(content)
                .then(()=>{
                    resolve()
                })
                document.body.appendChild(messageDom.$el)    
            })
        },
        confirm: function(content,title,obj){
            var myobj={confirmButtonText:'',cancelButtonText:''};
            if(obj=== undefined || obj === null){
                myobj = {confirmButtonText:'确定',cancelButtonText:'取消'}
            }else if(typeof(obj)==='object'){
                myobj.confirmButtonText = obj.confirmButtonText||'确定';
                myobj.cancelButtonText = obj.cancelButtonText||'取消';
                myobj.htmlfomat = obj.htmlfomat || false;
            }
            if(typeof(title)!='string'){
                if(typeof(title)==='object'){
                    myobj.confirmButtonText = title.confirmButtonText||'确定';
                    myobj.cancelButtonText = title.cancelButtonText||'取消';
                }
                title=false
            }
            return new Promise((resolve,reject)=>{
                const confirmDom = new MessageBoxConstructor({
                    el: document.createElement('div'),
                    data(){
                        return{
                            confirmTitle:title||'提示',
                            confirm_text:content,
                            confirmShow:false,
                            confirmButtonText:myobj.confirmButtonText,
                            cancelButtonText:myobj.cancelButtonText,
                            htmlfomat:myobj.htmlfomat
                        }
                    }
                })
                //把实例添加到body里
                document.body.appendChild(confirmDom.$el)    
                confirmDom.showConfirm(content)
                .then(()=>{
                    resolve()
                })
                .catch(()=>{
                    reject()
                })
              
            })
        }
    
    }
