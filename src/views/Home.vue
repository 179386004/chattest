<template>
  <div class="home">
      <div class="login">
    <div class="container">
       <div class="row ">
        
         <div class="col-md-6 m-auto pt-5 "  style="height:500px">
          
           <div class="card mt-5">

             <div class="card-header bg-white ">
               <img style="display:inline-block;margin-right:10px" :src="url">
               <h5 style="display:inline-block">{{username}}</h5>
               <h3 style='text-align:center'>聊天室</h3>
             </div>
            

             <div class="card-body">
               <div id="selectborder">
                 <p>当前在线人数:{{total}}</p>
                 <span>用户列表:</span> 
                 
                   <img v-for="item in list" :key="item.name" :src="item.url" alt="" class="imgshow">
                
                  
               </div>
               <div id="chatborder">
                  
               </div>
               <div class="mt-2 mb-2 border p-3">
                
                
                 <img src="../images/表情.png" @click="emoclick">
                  <a id="emoji" href="javascript:;" title="颜文字" style="display:none">颜文字</a>


                
                 <img src="../images/文件夹.png" class="file" @click="imgclick">
                 <input id="file" type="file" name="file" class="file" value="" @change='upchange' style="display: none">
                  <el-input v-model="text" size="medium" placeholder="请输入消息" class="mt-2"></el-input>
               </div>
               <el-form  class="demo-form-inline">

        
      
       
 
  
  
   <el-form-item>
    <el-button type="primary" size="medium" class="w-100" @click="onSubmit">发送</el-button>
  </el-form-item>
               </el-form>
               
             </div>
           </div>

           
         </div>
       </div>
    </div>
  

  </div>
     
  </div>
</template>

<script>


// @ is an alias to /src



export default {
  name: 'Home',
  components: {
  
  },
  data(){
    return{
      id:'1',
      username:'',
      url:'',
      text:'',
      list:[],
      total:''
    }

  },
  methods:{
    /* upload(){
    
    
         var file = this.files[0]
        var fr = new FileReader()
        fr.readAsDataURL(file)
        fr.onload = function () {
          console.log(fr.result);
        } 
      

    }, */
    upchange(){
     /*  const _this = this */
      var file = event.target.files[0];
         console.log(file);
         var fr = new FileReader();
         fr.readAsDataURL(file)
         fr.onload = ()=>{
           console.log(fr.result);
           this.$socket.emit('upic',{
             username:this.username,
             url:this.url,
             file:fr.result
           })
         }
         
    },
    emoclick(){
        $("#emoji").click();
    },



    ceshi(){
      console.log(this.id);
 
    },
    imgclick(){
           $("#file").click();
    },
    onSubmit(){
      if(this.text ==''){
        this.$message({
          message:'发送消息不能为空',
          type:'error'
        })
      }
      else{
      this.$socket.emit('chat',{name:this.username,text:this.text,url:this.url})
      this.text = ''
      }
    }

  },
  created(){
    this.url = sessionStorage.getItem('currentavatar')
    this.username = sessionStorage.getItem('currentuname')
  },
    sockets: {
    

           /*  login() {

               

                this.$socket.emit('login', this.username);      //监听connect事件

            },  */
            //用户列表
           list(data){
             this.total = data.length
             console.log(data);
             this.list = data
             console.log(this.list);
            

           },
           //聊天室满了
           overload(data){
             this.$message({
               message:'当前聊天室已满',
               type:'warning'
             })
             this.$router.push('/')
             

           },

          send(data) {   
          console.log(data);  
          var div = document.getElementById('chatborder')         
          var dv = document.createElement('div')    
          dv.style.textAlign = "center"               //监听message事件，方法是后台定义和提供的
          dv.style.color = 'green'
          dv.innerHTML = data
          div.appendChild(dv)
          div.lastElementChild.scrollIntoView(false)
          

        
               

            },
           //聊天
            chated(data){
          var div = document.getElementById('chatborder')         
          var dv = document.createElement('div')    
          const hero  = `<div>
          <img src='${data.url}' style="width:30px;height:30px;margin-right:10px">
          <span>${data.name}:</span>
          <span>${data.text}</span>
          </div>`
          const myhero =`<div>
          <span class='last'>${data.text}</span>
          <img src='${data.url}' style="width:30px;height:30px;margin-right:10px">
          </div>`
          dv.style.color = 'black'          
          dv.style.marginBottom = '5px'
          dv.scrollIntoView(false)
          if(data.name == this.username){
            dv.style.textAlign = 'right'
            dv.innerHTML = myhero
          }

          else{
            dv.innerHTML = hero
          }



          div.appendChild(dv)
          div.lastElementChild.scrollIntoView(false)
         
         this.sockets.subscribe('leave', (data) => {
          console.log(data)
          })

             

            },
            //用户离开聊天室
            leave(data){
              console.log('触发');
              var div = document.getElementById('chatborder')         
          var dv = document.createElement('div')    
          dv.style.color = 'red'
          dv.style.textAlign = 'center'              
          dv.innerHTML = `${data.name}离开了聊天室`
          div.appendChild(dv)
          div.lastElementChild.scrollIntoView(false)
         
            },
            //用户名重复
            exist(){
              console.log(1);
            this.$router.push('/')
            this.$message({
              message:'用户名重复',
              type:'error'
            })



            },
            //发送图片
            repic(data){
          console.log(data);
          var div = document.getElementById('chatborder')         
          var dv = document.createElement('div')    
          const hero  = `<div>
          <img src='${data.url}' style="width:30px;height:30px;margin-right:10px">
          <span>${data.username}:</span>
          <img src='${data.file}' style='width:50px;height:50px'>
          </div>`

          const myhero =`<div>
         <img src='${data.file}' style='width:50px;height:50px'>
          <img src='${data.url}' style="width:30px;height:30px;margin-right:10px">
          </div>`
          dv.style.color = 'black'          
          dv.style.marginBottom = '5px'
          dv.scrollIntoView(false)
           if(data.username == this.username){
            dv.style.textAlign = 'right'
            dv.innerHTML = myhero
          }

          else{
            dv.innerHTML = hero
          }



          div.appendChild(dv)
          div.lastElementChild.scrollIntoView(false)
          
              
            }
        },

  mounted(){
     /*     */
     this.$socket.emit('login', {name:this.username,url:this.url});

       $(document).ready(function(){
        $("a#emoji").cokEmoji({
            appendto: "#content",
            autoparse: "image",
            position: "right"
        });
    });
     
    
  },
  
      
  
}
</script>
<style scoped>
#chatborder{
  height: 500px;
  border: 1px solid #66B1FF;
  padding: 5px;
  overflow: scroll;
}
#selectborder{
 
  border: 1px solid #66B1FF;
  margin-bottom: 10px;
  padding: 5px;
}
img{
  width: 30px;
  height: 30px;
}
.file{
  margin-left: 10px;
}

</style>