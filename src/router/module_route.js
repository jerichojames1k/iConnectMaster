import AUTH from 'services/auth'

let beforeEnter = (to, from, next) => {
    // AUTH.currentPath = to.path
    if (to.meta.tokenRequired === true) {
        if (AUTH.user !== null) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        next()
    }
}
var devRoutes = [];
let app = require('router/app.js')
devRoutes = devRoutes.concat(app.default.routes)
for (let x = 0; x < devRoutes.length; x++) {
    devRoutes[x]['beforeEnter'] = beforeEnter
}

//default route
let routes = [
    {
        path: '/',
        name: 'home',
        component: resolve => require(['modules/basic/Register&LoginPage.vue'], resolve),
        beforeEnter: beforeEnter
    }
]
routes = routes.concat(devRoutes)
export default {
    routes: routes
}

