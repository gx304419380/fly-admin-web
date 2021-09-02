<template>
  <div>
    <el-form ref="addGroupForm" v-loading="formLoading" :rules="groupRules" :model="groupData" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="groupData.name" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="父节点" prop="parentName">
        <el-input v-model="groupData.parentName" disabled />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="groupData.description" type="textarea" :rows="6" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as GroupApi from '@/api/group'

export default {
  name: 'GroupEditor',
  props: {
    parent: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      formLoading: false,
      groupData: {
        parentId: this.parent.id,
        parentName: this.parent.name,
        type: 'org'
      },
      groupRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    parent(val) {
      this.resetForm()
      this.groupData.parentId = val.id
      this.groupData.parentName = val.name
    }
  },
  methods: {
    submitForm() {
      this.formLoading = true
      GroupApi.saveGroup(this.groupData).then(res => {
        this.$message.success('保存成功')
        this.$emit('saveSuccess', res.data)
      }).finally(() => {
        this.formLoading = false
      })
    },
    resetForm() {
      this.$refs['addGroupForm'].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
