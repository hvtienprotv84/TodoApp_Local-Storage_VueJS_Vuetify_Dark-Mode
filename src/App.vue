<template>
  <v-app id="app" class="grey--text text--darken-2">
    <router-view></router-view>
    <v-footer>
      <v-card flat tile width="100%" class="footer text-center">
        <v-divider></v-divider>
        <v-card-text>
          <strong class="copyright">Mọi Bản Quyền Thuộc về Huỳnh Vĩnh Tiến</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import vuetify from "@/plugins/vuetify";
export default {
  name: "app",
  vuetify,
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(rgb(94, 98, 235), rgb(82, 85, 227));
}
.v-footer {
  padding: 0;
}
.footer {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #a9a9a9;
}
.copyright{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 18px;
}
</style>