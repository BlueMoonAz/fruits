<script setup>
import { onMounted,ref } from 'vue';
import axios from 'axios';

const items = ref(null);
const itemsTotal = ref(0);
const page=ref(1);
const pageSize=10;
const pagedItems = ref(null);

const setPage = (val)=>{
  page.value=val;
  setPagedItems();
}

const setPagedItems = () => {
  pagedItems.value=items.value.slice(pageSize * page.value - pageSize, pageSize * page.value);
}

onMounted(()=>{
  axios.get('/api/list')
            .then((res)=>{
              items.value=res.data;
              itemsTotal.value=items.value.length;
              setPagedItems();
    });
})

import Add from '@/Pages/Fruits/Add.vue' //追加
const addRef = ref();　//追加

import Edit from '@/Pages/Fruits/Edit.vue'　//追加
const editRef = ref();　//追加

import {deleteOpen} from '@/Pages/Fruits/Delete.js' //追加
</script>

<template>
    <el-table :data="pagedItems" style="width: 100%">
    <el-table-column prop="id" label="id" width="80" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="price" label="価格" width="100"
      header-align="center" align="right">
      <template #default="scope">
        <div v-if="scope.row.price" >
          {{scope.row.price.toLocaleString()}}
        </div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" @click.prevent="editRef.open(pagedItems[scope.$index])"><!--編集-->
          編集
        </el-button>
        <el-button link type="primary" @click.prevent="deleteOpen(pagedItems[scope.$index])" 
        >
          削除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :total="itemsTotal" @current-change="setPage"></el-pagination>
  <el-button @click="addRef.open()">
    新規作成
  </el-button>
  <Add ref="addRef"></Add>
  <Edit ref="editRef"></Edit>
</template>
