import axios from 'axios'
import store from '@/store/index'
import QS from 'qs'

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}

//设置默认请求超时时间，如果超过10s,就会告知用户当前的请求超时，请刷新等。
axios.defaults.timeout = 10000; 

//post请求头的设置
//post请求的时候,我们需要加上一个请求头,所以可以在这里进行一个默认的设置
//即post的请求头为application/x-www-form-urlencoded;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
//我们在发送请求前可以进行一个请求的拦截,为什么要拦截呢？
//比如,有些请求是需要用户登陆之后才可以访问的,或者post请求的时候我们需要序列化我们提交的数据
//这时候,我们可以在请求被发送之前进行一个拦截,从而进行我们想要的操作

axios.interceptors.request.use(
    config =>{
        const token  =  store.state.token;
        token && (config.headers.Authorization = token)
    }
)


