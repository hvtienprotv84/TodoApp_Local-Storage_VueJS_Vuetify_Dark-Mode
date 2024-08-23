import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'md',
    },
    theme: {
        options: {
            customProperties: true,
            themeCache: {
                get: key => localStorage.getItem(key),
                set: (key, value) => localStorage.setItem(key, value),
            },
          },
        dark: true,
        themes: {
            light: {
                primary: '#5A5EE7',
                secondary: '#f57173',
                accent: '#8F8DA5',
                error: '#b71c1c',
            },
            dark: {
                background: '#c2c2c2', // If not using lighten/darken, use base to return hex
                primary: "#5A5EE7",
                secondary: '#f57173',
                accent: '#8F8DA5',
                error: '#b71c1c',
            },
        },
    }
}

export default new Vuetify(opts)