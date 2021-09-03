<template>
  <div style="height: 100%;">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <div v-loading="loadTree" style="height: calc(100vh - 130px);">
      <el-scrollbar class="custom-scroll">
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="treeData"
          :props="treeProps"
          default-expand-all
          :highlight-current="true"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          style="margin-top: 10px;margin-right: 8px"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span :ref="'treeNode' + data.id">
              <i :class="generateIcon(data)" style="margin-right: 10px" />{{ node.label }}
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    treeProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'name',
          disabled: 'disabled'
        }
      }
    },
    checkedId: {
      type: String,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      screenHeight: document.body.clientHeight,
      filterText: '',
      loadTree: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData(val) {
      this.loadTree = false
      // 默认点击第一个
      this.$nextTick().then(() => {
        const checkNode = this.checkedId ? this.$refs['treeNode' + this.checkedId] : document.querySelector('.el-tree-node')
        if (checkNode) {
          checkNode.click()
        }
      })
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    handleNodeClick(node) {
      this.$emit('node-click', node)
    },
    generateIcon(data) {
      switch (data.level) {
        case 1:
          return 'el-icon-s-home'
        case 2:
          return 'el-icon-office-building'
        default:
          return 'el-icon-discount'
      }
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-right: 8px;
}

/deep/ .el-scrollbar__bar.is-vertical {
  opacity: 1;
}
</style>
