<template>
  <div class="app-container">
    <el-row style="height: 100%">
      <el-col :span="6" style="padding-right: 20px; border-right: 2px solid #ccc">
        <group-tree
          :tree-data="treeData"
          :tree-props="treeProps"
          :checked-id="checkedNodeId"
          @node-click="handleNodeChange"
        />
      </el-col>
      <el-col :span="18">
        <div style="padding-left: 20px; padding-top: 10px">
          <div>
            <span style="font-size: 18px">节点详情</span>
            <el-button v-if="treeNode.permissionType === 1" size="small" type="primary" style="position: absolute;right:100px;top:0;" @click="editNode">保存</el-button>
            <el-button v-if="treeNode.permissionType === 1" size="small" type="success" style="position: absolute;right:0;top:0;" @click="addChild">新增子节点</el-button>
          </div>
          <el-divider />
          <div>
            <el-form ref="nodeForm" v-loading="loadGroup" :model="currentNode" label-width="100" label-position="left">
              <el-form-item label="组织名称">
                <el-input v-model="currentNode.name" />
              </el-form-item>
              <el-form-item v-if="currentNode.id !== 'ORG_ROOT'" label="父节点">
                <el-input disabled :value="getParentName(currentNode)" />
              </el-form-item>
              <el-form-item label="路径">
                <el-input v-model="currentNode.namePath" disabled />
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="currentNode.description" type="textarea" :rows="4" maxlenght="200" show-word-limit />
              </el-form-item>
            </el-form>
          </div>
          <!--          <pre style="font-family: Consolas,serif">{{ JSON.stringify(currentNode, null, "\t") }}</pre>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GroupTree from '@/views/system/group/GroupTree'
import * as GroupApi from '@/api/group'

export default {
  components: { GroupTree },
  data() {
    return {
      loadGroup: false,
      checkedNodeId: null,
      currentNode: {},
      treeNode: {},
      treeProps: {
        children: 'children',
        label: 'name'
      },
      treeData: []
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    handleNodeChange(node) {
      if (node === this.treeNode) {
        return
      }
      this.treeNode = node
      this.loadGroup = true
      GroupApi.getGroup(node.id).then(res => {
        this.currentNode = res.data
      }).finally(() => {
        this.loadGroup = false
      })
    },
    getTree() {
      GroupApi.getTree().then(res => {
        this.treeData = res.data
      })
    },
    editNode() {
      this.loadGroup = true
      GroupApi.saveGroup(this.currentNode).then(res => {
        // toast success
        this.$message.success('保存成功')

        // click the updated node
        this.checkedNodeId = this.currentNode.id

        // refresh tree
        this.getTree()
      }).finally(() => {
        this.loadGroup = false
      })
    },
    addChild() {
      console.log('add')
    },
    getParentName(node) {
      const namePath = node.namePath
      if (!namePath) {
        return null
      }

      const split = namePath.split('/')
      if (split.length > 3) {
        return split[split.length - 3]
      }
    }
  }
}
</script>

<style scoped>
</style>
