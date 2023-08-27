<template>
    <el-container>
        <el-aside width="150px">
            <el-menu class="el-menu-vertical-demo" 
                router>
                <el-menu-item index="auth.logout" :route="{ name:'auth.logout' }">
                    ログアウト
                    </el-menu-item>
                <el-menu-item index="fruits.list" :route="{ name:'fruits.list' }">
                    フルーツ
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
                <router-view></router-view>
        </el-main>
    </el-container>
</template>
