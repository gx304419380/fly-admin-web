<template>
  <div class="app-container">
    <el-row style="height: 100%">
      <el-col :span="6" style="padding-right: 20px;">
        <group-tree
          :tree-data="treeData"
          @node-click="handleNodeChange"
        />
      </el-col>
      <el-col :span="18" style="padding-left: 20px">
        <el-form :inline="true" :model="condition" size="mini">
          <el-row>
            <el-form-item label="姓名">
              <el-input v-model="condition.name" placeholder="姓名" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="condition.username" placeholder="用户名" />
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="condition.phone" placeholder="手机" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-table
          v-loading="loadUser"
          :data="userList"
          stripe
          border
          :height="tableHeight"
        >
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="80"
          />
          <el-table-column
            align="center"
            prop="username"
            label="用户名"
            min-width="140"
          />
          <el-table-column
            align="center"
            prop="groupName"
            label="组织"
            width="80"
          />
          <el-table-column
            align="center"
            prop="phone"
            label="手机"
            min-width="140"
          />
          <el-table-column
            align="center"
            prop="email"
            label="邮箱"
            min-width="140"
          />
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="140"
          />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GroupTree from '@/views/system/group/GroupTree'
import * as GroupApi from '@/api/group'
import * as UserApi from '@/api/user'

export default {
  components: { GroupTree },
  data() {
    return {
      loadUser: false,
      treeNode: {},
      treeData: [],
      userList: [],
      tableHeight: window.innerHeight - 160,
      condition: {
        groupId: null,
        pageNo: 1,
        pageSize: 20,
        phone: null,
        username: null,
        name: null
      }
    }
  },
  mounted() {
    GroupApi.getTree().then(res => { this.treeData = res.data })
  },
  methods: {
    handleNodeChange(node) {
      if (node === this.treeNode) {
        return
      }
      this.treeNode = node
      this.condition.groupId = node.id
      this.searchUser()
    },
    onSearch() {
      this.condition.pageNo = 1
      this.searchUser()
    },
    searchUser() {
      this.loadUser = true
      UserApi.getUserList(this.condition).then(res => {
        console.log(res)
      }).finally(() => {
        this.loadUser = false
      })
    }
  }
}
</script>

<style scoped>

</style>
