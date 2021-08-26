<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行过滤"
        />
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          highlight-current="true"
          :filter-node-method="filterNode"
          style="margin-top: 10px"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>
              <i :class="data.icon" style="margin-right: 10px" />{{ node.label }}
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18">
        Test
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      treeData: [{
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>

/deep/ .el-tree-node.is-current>.el-tree-node__content {
  background-color: #409eff !important;
  color: white;
}

.custom-tree-node {
  font-size: 16px;
}
</style>
