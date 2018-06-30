
// Do not using post css loader
import '@/extlib/fontawesome-free/css/all.css'
import '@/extlib/siimple_custom.css'
// Original css
import '@/css/main.scss'


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import NavigationGuard from '@/scripts/NavigationGuard'
import Resource from '@/scripts/Resource'
import Store from '@/scripts/Store'

NavigationGuard.setRouter(router)
Resource.setup()


Vue.config.productionTip = false
Vue.config.errorHandler = function(err, vm, info) {
  console.log(info)
  console.error(err)
  return false
}



/*
//
router.beforeEach(function(to, from, next) {
  //console.log('each')
  //console.dir(arguments)
  //console.log(window.history.length)
  //console.dir(window.history)

  //
  if (to.name === '@=setup') {
    //console.log('Just setup')
    if (Store.isInitialized) {
      next({
        replace: true,
        //path: '/not_found'
        name: '@=not_found'
      })
    } else {
      next();
    }
  }
  else if (!Store.isInitialized && to.meta.needDataSetup) {
    //console.log('Need setup')
    next({
      replace: false,
      //path: '/setup',
      name: '@=setup',
      query: {
        redirect_to: to.fullPath
      }
    })
  }
  else {
    //console.log('Already setup')
    next()
  }

})
*/

//
function createAppVM() {

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })

}
setTimeout( createAppVM, 0 )

//
// Store.initializeAsync('normal').then(()=>{
//   createAppVM()
// })
