<template>
    <div>
        <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />

        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-right-icon="username = ''"
            :error-message="usernameErrormsg"
        />
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message="passwordErrormsg"
        />
        <div class="register-button">
            <van-button type="primary" @click="loginAction" :loading="openLoading" size="large">登录</van-button>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/server.config.js'
import { Toast } from 'vant'

    export default {
        data() {
            return {
                username:'',
                password:'',
                openLoading:false,
                usernameErrormsg:'',   //前端错误信息验证，可用vant提供的：error-message提示
                passwordErrormsg:''
            }
        },
        created() {
                if(localStorage.userInfo){
                    Toast.success('您已经登录')
                    this.$router.push('/')
                }
            },
        methods:{
            
            goBack(){
                this.$router.go(-1)
            },
            loginAction(){
                this.checkForm() && this.axiosloginUser()
            },
            axiosloginUser(){
                this.openLoading=true
                axios({
                    url:url.loginUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password 
                    }
                })
                .then(response => {
                    console.log(response);
                    if(response.data.code===200 && response.data.message){
                        new Promise((resolve,reject)=>{
                            localStorage.userInfo={userName:this.username}
                            setTimeout(()=>{
                                    resolve()
                                },500)
                        })
                        .then(()=>{
                                Toast.success('登录成功')
                                this.$router.push('/')
                        }).catch(err=>{
                                Toast.fail('登录状态保存失败')
                                console.log(err)
                        })
                    }else{
                        Toast.fail('登录失败')
                        this.openLoading=false
                    }
                })
                .catch(error=>{
                   Toast.fail('登录失败')
                })
            },
            //用户输入信息验证
            checkForm(){
                let isOk=true
                if(this.username.length<5){
                    isOk=false
                    this.usernameErrormsg="输入的用户名不应少于5位"
                }else{
                    this.usernameErrormsg=''
                }
                if(this.password.length<6){
                    isOk=false
                    this.passwordErrormsg="输入的密码不应少于6位"
                }else{
                    this.passwordErrormsg=''
                }
                return isOk
            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>