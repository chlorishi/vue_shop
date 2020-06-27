<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-row>
        <!-- 搜索框 -->
        <el-col :span="5">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="ordersForm" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="props">
            <el-tag type="success" v-if="props.row.pay_status==='1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="props">{{props.row.create_time|dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialogVisible"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="showKuaidiDialogVisible"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ordersInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="addr1">
          <el-cascader :options="cityData" :value="editForm.addr1" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr2">
          <el-input v-model="editForm.addr2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流信息对话框 -->
    <el-dialog
      title="物流进度"
      :visible.sync="kuaidiDialogVisible"
      width="50%"
      @close="kuaidiDialogClosed"
    ></el-dialog>
  </div>
</template>
<script>
import cityData from './citydata'
export default {
  data() {
    return {
      //获取订单数据请求对象
      ordersInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      //订单列表数据
      ordersForm: [],
      //修改地址对话框显示
      editDialogVisible: false,
      editForm: {
        addr1: [],
        addr2: ''
      },
      editFormRules: {
        addr1: [{ required: true, message: '请选择省市区县', trigger: 'blur' }],
        addr2: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      },
      cityData,
      kuaidiDialogVisible: false,
      kuaidiInfo: []
    }
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    //获取订单列表
    async getOrdersList() {
      const { data: res } = await this.$http.get('orders', {
        params: this.ordersInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败')
      }
      this.ordersForm = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.ordersInfo.pagesize = newSize
      this.getOrdersList()
    },
    handleCurrentChange(newPage) {
      this.ordersInfo.pagenum = newPage
      this.getOrdersList()
    },
    //展示编辑对话框
    showEditDialogVisible() {
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    async showKuaidiDialogVisible() {
      const { data: res } = await this.$http.get('kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流信息失败')
      }
      this.kuaidiInfo = res.data
      this.kuaidiDialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
