<template>
  <div class="app-container">
    <el-row style="height: 100%">
      <el-col :span="6" style="padding-right: 20px; border-right: 2px solid #ccc">
        <group-tree
          :tree-data="treeData"
          @node-click="handleNodeChange"
        />
      </el-col>
      <el-col :span="18">
        {{ currentNode.label }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GroupTree from '@/views/system/group/GroupTree'

export default {
  components: { GroupTree },
  data() {
    return {
      currentNode: {},
      treeData: [
        {
          id: 1,
          icon: 'el-icon-eleme',
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            icon: 'el-icon-phone',
            children: [{
              id: 9,
              label: '三级 1-1-1',
              icon: 'el-icon-eleme'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }]
    }
  },
  methods: {
    handleNodeChange(node) {
      console.log('node=', node)
      this.currentNode = node
    }
  }
}
</script>

<style scoped>
</style>
