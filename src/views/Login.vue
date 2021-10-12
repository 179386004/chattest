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
               
               <el-form  class="demo-form-inline">
          <el-form-item label="">
       <el-input v-model="username" size="medium" placeholder="请输入用户名"></el-input>
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
    <el-button type="primary" size="medium" class="w-100" @click="onSubmit">登陆</el-button>
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

export default {
  name: 'Login',
  components: {}  
  ,
  data() {
      return {
         url:'',
         username:''
      }
  },
  methods:{
     onSubmit() {
        var avatar = $("img.change").attr('src') 
        this.url = avatar;
        console.log(this.username.trim());
        console.log(this.url);
        if(this.url!=undefined&&this.username!=''){
          this.$router.push('/home')
          sessionStorage.setItem('currentavatar',this.url)
          sessionStorage.setItem('currentuname',this.username)
        }
        else{
            this.$message({
              message:'请填写用户名并选择头像',
              type:'warning'
            })
        }
        

        
      },
    
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
