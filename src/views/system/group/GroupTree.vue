<template>
  <div :style="{height: screenHeight - 90 + 'px'}">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      class="filter-tree"
      :data="treeData"
      :props="treeProps"
      default-expand-all
      :highlight-current="true"
      :filter-node-method="filterNode"
      :expand-on-click-node="expandOnClick"
      style="margin-top: 10px"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span :ref="'treeNode' + data.id">
          <i :class="generateIcon(data)" style="margin-right: 10px" />{{ node.label }}
        </span>
      </span>
    </el-tree>
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
          label: 'label',
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
      expandOnClick: false,
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    treeData(val) {
      this.expandOnClick = false
      // 默认点击第一个
      this.$nextTick().then(() => {
        const checkNode = this.checkedId ? this.$refs['treeNode' + this.checkedId] : document.querySelector('.el-tree-node')
        if (checkNode) {
          checkNode.click()
        }
        this.expandOnClick = true
      })
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(node) {
      this.$emit('node-click', node)
    },
    generateIcon(data) {
      return data.level === 1 ? 'el-icon-s-home' : 'el-icon-office-building'
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
</style>
