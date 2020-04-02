<template>
  <div>
    <el-form ref="s-form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('s-form')">Login</el-button>
        <el-button >Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from '../axios';

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [ { required: true, message: "Username field cannot be blank", trigger: 'blur'}],
          password: [ 
            { required: true, message: "Password field cannot be blank", trigger: 'blur'}, 
            { min: 8, message: "Password should be at least 8 character long.", trigger: 'blur'},
          ],
        },
        errors: [],
        showPassword: false
      }
    },
    methods: {
      async onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            try {
              submitToServer.call(this)
            } catch (e) {
              this.errors.push(e.message)
            }
          } else {
            this.errors.push('Authentication error.')
            resetForm.call(this)
          }
        })

        async function submitToServer() {
          const res = await axios.post('/signin', {
            data: this.form
          })
          resetForm.call(this)
          if (res) { console.log('login success.') }
        }
        
        function resetForm() {
          this.form = { ...this.form, password: "" };
        }
      }
    }
  }
</script>
