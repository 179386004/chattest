<template>
  <div class="login">
    <div class="container">
       <div class="row ">
         <div class="col-12 col-lg-5 col-md-7 col-sm-9 m-auto pt-5 "  style="height:500px">
           <div class="card mt-5">
             <div class="card-header bg-white ">
               <h3 class="text-center mb-0">聊天</h3>
             </div>

             <div class="card-body">
               
               <el-form  class="demo-form-inline"
               :model="form"
               :rules="rules"
            
               @keyup.enter.native="onSubmit"
               >
          <el-form-item label="用户名:" prop="username">
       <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
  </el-form-item>

  <el-form-item label="密码:" prop="password">
       <el-input v-model="form.password" show-password size="medium" placeholder="请输入密码"></el-input>
  </el-form-item>
  <div class="mb-1">请选择头像:</div>
   <div class="imgbox" border>
     <img src="../images/avatar09.png">
     <img src="../images/avatar11.png">
     <img src="../images/avatar15.png">
     <img src="../images/avatar19.png">
     <img src="../images/avatar30.png">
     <img src="../images/avatar35.png">
     <img src="../images/avatar37.png">
     <img src="../images/avatar38.png">
   </div>
  
  
   <el-form-item>
    <el-button type="primary" size="medium" class="w-100" :disabled="this.form.username==''||this.form.password==''" @click="onSubmit">登陆</el-button>
  </el-form-item>

    
   <el-form-item>
    <el-button type="primary" size="medium" class="w-100" @click="onRegister">注册</el-button>
  </el-form-item>
               </el-form>
               
             </div>
           </div>
         </div>
       </div>
    </div>
  

  </div>
</template>

<script>
// @ is an alias to /src
  import $ from 'jquery'
  import qs from 'qs'

export default {
  name: 'Login',
  components: {}  
  ,
  data() {
      return {
         url:'',
         form:{
            username:'',
            password:''
         },
         rules:{
           username:[
             {require:true,message:'请输入账号'},
             {min:3,max:10,message:'用户名在3到10个字符之间'}

           ]
         }
        
      }
  },
  methods:{
     onSubmit() {
      
      let oc = {
        username:this.form.username,
        password:this.form.password  
      }
       let obj = qs.stringify(oc)
      this.axios.post('http://localhost:8812/api/login',
       obj
      ,{
        headers:{
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }}).then(res=>{

        this.$message.success('登陆成功')
        console.log(res.data.data.token);
        let token = res.data.data.token
        this.$store.commit('set_token',token)
      }).catch(error=>{
        console.log(error);
        this.$message.error('请检查用户名和密码')
      })


        

        
      },
      onRegister(){

      }
    
  },
  
  mounted(){
  /*   var imgs = document.querySelectorAll('img')
        for(let i =0;i<imgs.length;i++){
            imgs[i].addEventListener('click',function(){ 
              
               if(imgs[i].className.indexOf('change') > -1){    
                 
　        　     imgs[i].classList.remove('change');
                  
                }else{
　　             imgs[i].classList.add("change");
                  }

            })
        } 
console.log(imgs);  */
    $("img").on('click',function(){
       console.log(1);
       $(this).addClass('change').siblings().removeClass('change')

    })
  
  }
}
</script>

<style scoped>
.nochange{

}
.change{
  border: 1px solid pink;
}
.imgbox{
  padding: 5px;
  border: 1px dashed grey;
  margin-bottom:20px ;
}
img{
  width: 30px;
  height: 30px;
}

</style>
