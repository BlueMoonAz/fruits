import axios from 'axios';
import {ElNotification,ElMessageBox } from 'element-plus'
import {useFruitsStore} from '@/assets/FruitsStore.js' //追加

const deleteOpen=(item,pinia)=>{
        ElMessageBox.confirm(
          item.name+'を削除します。よろしいですか?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        )
          .then(() => {
            axios.delete('/api/delete/'+item.id)
              .then((res)=>{
                ElNotification({
                  type: 'success',
                  message: item.name+'を削除しました',
                });
                const fs=useFruitsStore(pinia); //追加
                fs.getList(); //追加
              }).catch((error)=>{
                ElNotification({
                  type: 'error',
                  message: item.name+'の削除に失敗しました',
                });
              })
          })
          .catch(() => {
            ElNotification({
              type: 'info',
              message: '削除をキャンセルしました',
            });
          })
}
export {deleteOpen}
