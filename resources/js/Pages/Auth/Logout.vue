<script setup>
import { onMounted } from 'vue'
import axios from 'axios'
//import { useLoginState } from '../../assets/LoginState.js'
import { useRouter } from 'vue-router'

//const st = useLoginState();
const router = useRouter();

const logout =()=>{
    axios.post('/logout').then((res)=>{
                        console.log('logout response:'+res.data.message);
                        //st.setLogout();
                        router.push({name:'auth.login'})
                    }).catch((err)=>{
                        console.log('logout error:'+err);
                    })
}

onMounted(()=>{
    logout();
})
</script>
<template></template>
