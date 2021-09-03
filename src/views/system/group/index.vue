<template>
  <div class="app-container">
    <el-row style="height: 100%">
      <el-col :span="6" style="padding-right: 20px;height: 100%">
        <group-tree
          :tree-data="treeData"
          :checked-id="checkedNodeId"
          @node-click="handleNodeChange"
        />
      </el-col>
      <el-col :span="18" style="height: 100%">
        <div style="display: flex; justify-content: flex-end">
          <span style="font-size: 18px; flex: 1; padding-top: 10px">节点详情</span>
          <el-button v-if="treeNode.permissionType === 1" size="small" type="primary" @click="editNode">保存</el-button>
          <el-button v-if="treeNode.permissionType === 1" size="small" type="success" @click="addChild">新增子节点</el-button>
          <el-button v-if="treeNode.permissionType === 1 && treeNode.id !== 'ORG_ROOT'" type="danger" size="small" @click="deleteGroup">删除</el-button>
        </div>
        <el-divider />
        <div style="height: calc(100vh - 150px);">
          <el-scrollbar class="custom-scroll">
            <el-form
              ref="nodeForm"
              v-loading="loadGroup"
              :rules="groupRules"
              :model="currentNode"
              label-width="100"
              label-position="left"
              style="margin-right: 10px"
            >
              <el-form-item label="组织名称" prop="name">
                <el-input v-model="currentNode.name" maxlength="20" show-word-limit />
              </el-form-item>
              <el-form-item v-if="currentNode.id !== 'ORG_ROOT'" label="父节点">
                <el-input disabled :value="getParentName(currentNode)" />
              </el-form-item>
              <el-form-item label="路径">
                <el-input v-model="currentNode.namePath" disabled />
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="currentNode.description" type="textarea" :row="4" maxlength="200" show-word-limit />
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
        <el-drawer
          title="新增子节点"
          size="50%"
          :visible.sync="addChildDrawer"
          direction="rtl"
          :before-close="closeChildDrawer"
        >
          <div style="padding: 20px">
            <group-editor :parent="currentNode" @saveSuccess="addChildSuccess" />
          </div>
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GroupTree from '@/views/system/group/GroupTree'
import GroupEditor from '@/views/system/group/GroupEditor'
import * as GroupApi from '@/api/group'

export default {
  components: { GroupTree, GroupEditor },
  data() {
    return {
      screenHeight: document.body.clientHeight,
      loadGroup: false,
      checkedNodeId: null,
      addChildDrawer: false,
      afterSaveOrUpdate: false,
      currentNode: {},
      treeNode: {},
      treeData: [],
      groupRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
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
      // 如果是刚刚更新或新增的节点，则无需请求
      if (this.afterSaveOrUpdate) {
        this.afterSaveOrUpdate = false
        return
      }
      this.loadGroup = true
      GroupApi.getGroup(node.id).then(res => {
        this.$refs.nodeForm.resetFields()
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
        this.currentNode = res.data
        this.afterSaveOrUpdate = true
        // refresh tree
        this.getTree()
      }).finally(() => {
        this.loadGroup = false
      })
    },
    deleteGroup() {
      this.$confirm('确认删除？')
        .then(_ => {
          this.loadGroup = true
          GroupApi.deleteGroup(this.currentNode.id).then(res => {
            this.checkedNodeId = null
            this.getTree()
          }).finally(() => {
            this.loadGroup = false
          })
        })
        .catch(_ => {})
    },
    addChild() {
      this.addChildDrawer = true
    },
    addChildSuccess(group) {
      this.addChildDrawer = false
      this.checkedNodeId = group.id
      this.currentNode = group
      this.afterSaveOrUpdate = true
      this.getTree()
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
    },
    closeChildDrawer(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 12px 0;
}
/deep/ .el-form-item__label {
  font-weight: 700;
}
</style>
