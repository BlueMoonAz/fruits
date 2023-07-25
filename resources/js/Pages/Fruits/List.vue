<script setup>
import { onMounted,ref } from 'vue';

const items = ref(null);
const itemsTotal = ref(0);
const page = ref(1);

const setPage = (val)=>{
  page.value = val;
  reLoadItems();
}

import axios from 'axios';
const reLoadItems = ()=>{
  axios.get('/api/list',{
                params:{
                    page:page.value
                }
            })
            .then((res)=>{
              items.value = res.data.data;
              itemsTotal.value = res.data.total;
            });
}

onMounted(()=>{
    reLoadItems();
})

import Edit from '@/Pages/Fruits/Edit.vue'
const editRef = ref();

import Add from '@/Pages/Fruits/Add.vue'
const addRef = ref();

import Delete from '@/Pages/Fruits/Delete.vue'
const deleteRef = ref();
</script>

<template>
    <el-table :data="items" style="width: 100%">
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
        <el-button link type="primary" 
          @click.prevent="editRef.open(items[scope.$index])">
          編集
        </el-button>
        <el-button link type="primary"
          @click.prevent="deleteRef.open(items[scope.$index])">
          削除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :total="itemsTotal" @current-change="setPage"></el-pagination>
  <el-button @click="addRef.open()">
    新規作成
  </el-button>
  <Add ref="addRef" @reLoad="reLoadItems"></Add>
  <Edit ref="editRef" @reLoad="reLoadItems"></Edit>
  <Delete ref="deleteRef" @reLoad="reLoadItems"></Delete>
</template>
