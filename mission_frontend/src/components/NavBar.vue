<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">任务页面</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/posts-manager">发布/领取任务管理</b-nav-item>
          <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">登录</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>注销</b-nav-item>
          <b-nav-item href="/sign-up">注册新帐号</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>