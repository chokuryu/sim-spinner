//console.log('%%% router/index.js');
import Vue from 'vue'
import Router from 'vue-router'

//import SetupPage from '@/components/page/SetupPage'
import TopPage from '@/components/page/TopPage'
import DesignPage from '@/components/page/DesignPage'

import SignUpEntryPage from '@/components/page/SignUpEntryPage'
import LoginEntryPage from '@/components/page/LoginEntryPage'
import UnderLoginPage from '@/components/page/UnderLoginPage'
import NeedSignInPage from '@/components/page/NeedSignInPage'
import HomePage from '@/components/page/HomePage'
import WorkPage from '@/components/page/WorkPage/WorkPage'
import PreviewPage from '@/components/page/PreviewPage'
import WorkContent from '@/components/page/WorkPage/WorkContent'
import FactorContent from '@/components/page/WorkPage/FactorContent'
import NotFound from '@/components/page/NotFound'

Vue.use(Router)


//
const NSO = '/SPA';

//
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // if (savedPosition) {
    //   return(savedPosition)
    // } else {
    //   return({ x: 0, y: 0 })
    // }
    return new Promise((resolve, reject) => {
      //console.dir(savedPosition)
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ x: 0, y: 0 })
        }
      }, 0);
    });
  },

  // 公開Webサイト適合パス設定③
  //base: '/sim-spinner/',
  base: '',

  routes: [

    // Prerendered Routes
    // 1. These also should be rendered to static html files.
    // 2. Should accept to search those static files.
    // {
    //   path: '/app',
    //   name: '@=top',
    //   component: EmptyAppPage,
    //   meta: {
    //     title: 'SimSpinner'
    //   }
    // }
    // ,
    {
      path: '/',
      name: '@=top',
      component: TopPage,
      meta: {
        title: 'SimSpinner'
      }
    }
    ,
    {
      path: '/design',
      name: '@=design',
      component: DesignPage,
      meta: {
        title: 'SimSpinner | design'
      }
    }
    ,

    // Non-Static Only Routes ( /n-s/* )
    // 1. Should set proxy to ~/index.html file.
    // 2. Should keep out for search bot
    {
      path: NSO + '/sign_up_entry',
      name: '@=sign_up_entry',
      component: SignUpEntryPage,
      meta: {
        title: 'SimSpinner | sign up'
      }
    }
    ,
    {
      path: NSO + '/login_entry',
      name: '@=login_entry',
      component: LoginEntryPage,
      meta: {
        title: 'SimSpinner | login'
      }
    }
    ,
    {
      path: NSO + '/under_login',
      name: '@=under_login',
      component: UnderLoginPage
    }
    ,
    {
      path: NSO + '/need_sign_in',
      name: '@=need_sign_in',
      component: NeedSignInPage
    }
    // ,
    // {
    //   path: NSO + '/setup',
    //   name: '@=setup',
    //   component: SetupPage
    // }
    ,
    {
      path: NSO + '/home',
      name: '@=home',
      component: HomePage,
      meta: {
        title: 'SimSpinner'
      }
    }
    ,
    {
      path: NSO + '/work/:wid',
      //name: 'WorkPage',
      component: WorkPage,
      props: true,
      meta: {
        //needDataSetup: true,
        //title: 'SimSpinner'
      },
      children: [
        {
          path: '',
          name: '@=work>work_content',
          component: WorkContent,
          props: true,
          meta: {
            isSubRoute: true,
            title: 'SimSpinner'
          }
        }
        ,
        {
          path: 'factor/:fid',
          name: '@=work>factor_content',
          component: FactorContent,
          props: true,
          meta: {
            isSubRoute: true,
            title: 'SimSpinner'
          }
        }
      ]
    }
    ,
    {
      path: NSO + '/work/:wid/preview',
      name: '@=preview',
      component: PreviewPage,
      props: true,
      meta: {
        title: 'SimSpinner'
      }
    }
    ,
    {
      path: NSO + '/not_found',
      name: '@=not_found',
      component: NotFound,
      meta: {
        title: 'SimSpinner'
      }
    }
    ,
    {
      path: '*',
      // redirect: '/not_found'
      redirect: to => {
        return {
          //path: '/not_found',
          name: '@=not_found',
          alias: to.fullPath || null,
          query: {
            wrongType: 404,
            wrongPath: to.fullPath || null
          }
        }
      }
    }
  ]
})
