<template>
  <div>
    <!-- 外层容器 -->
    <el-container>
      <!-- 顶栏容器 -->
      <el-header>
        <router-link to="/blogs">
          <img src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png" style="height: 60%; margin-top: 10px">
        </router-link>
      </el-header>
      <!-- 主要区域容器 -->
      <el-main>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" status-icon>
          <!-- 1.表单控件一-输入框 -->
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" maxlength="12" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 2.表单控件二-输入框 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <!-- 3.表单控件三-按钮 * 2 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    // var validataPass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      //表单数据对象model   :model="ruleForm"
      ruleForm: {
        username: 'markerhub',
        password: '666666'
      },
      // 表单验证规则
      rules: {
        username: [
          { require: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符', trigger: 'blur' }
        ],
        password: [
          {
            require: true, // validator: validataPass,// 触发方式，blur失去焦点
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    // clone element-ui组件中表单部分内容
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/api/login', this.ruleForm).then((res) => {

            const jwt = res.headers['authorization'];
            const userInfo = res.data.data;

            // 把数据共享出去
            _this.$store.commit('SET_TOKEN', jwt)
            _this.$store.commit('SET_USERINFO', userInfo)

            console.log(_this.$store.getter.getUser);

            _this.$router.push('/blogs')

          }).catch((err) => {
            console.log('api请求错误!');
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>