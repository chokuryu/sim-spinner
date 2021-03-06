/**
*
* NavigationGuard.js
*
* 各ページ遷移時のバリデーション
*
*/
import Store from '@/scripts/Store'
import Resource from '@/scripts/Resource'

//
export default {
  setRouter(router) {
    router.beforeResolve((to, from, next) => {
      const componentName = to.matched[0].components.default.name
      if (guardFunctions[componentName]) {
        guardFunctions[componentName](to, from, next)
      } else {
        next()
      }
    })
  },
  attach(ViewModel) {
    if (!guardFunctions[ViewModel.name]) {
      throw Error('Navigation Guard Function is not exist.')
    }

    //ViewModel.beforeRouteEnter = guardFunctions[ViewModel.name]
    //ViewModel.beforeRouteUpdate = guardFunctions[ViewModel.name]
  }
}

//
const makeRoute = {
  needSignIn() {
    return {
      replace: true,
      name: '@=need_sign_in'
    };
  },
  notFound(wrongPath) {
    return {
      replace: true,
      name: '@=not_found',
      query: {
        wrongType: 500,
        wrongPath: wrongPath
      }
    };
  }
};


/*
*/
function guardCommonAsync() {
  //
  let outcome = {
    shouldSignIn: false
  }
  //
  let shouldBreak = false
  return Promise.resolve()
  .then(arg => Resource.userService.hasLivingSession())
  .then(result => {
    // Check session
    if (!result.has) {
      outcome.shouldSignIn = true
      shouldBreak = true
    }
  })
  .then(arg => {
    if (shouldBreak) return;
    // Check is store setup completed
    if (!Store.isInitialized) {
      // Setup store
      return Store.initializeAsync('normal')
    } else {
      return Promise.resolve()
    }
  })
  .then(arg => {
    // Finally
    return outcome
  })
}


/*
*/
const guardFunctions = {

  //
  LoginEntryPage(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) {
        // ログインが必要
        return next();
      }
      // ログイン不要ならログインページは表示せずにhome画面へ
      console.log('Auto confirmation ... login_entry -> under_login')
      return next({
        replace: false,
        name: '@=under_login'
      });
    });
  },

  //
  HomePage(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) return next(makeRoute.needSignIn());

      // If ok
      next()
    });
  },

  //
  WorkPage(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) return next(makeRoute.needSignIn());

      // Check accessibility (Work)
      if (validations.hasValidWork(to)) {
        next()
      } else {
        next(makeRoute.notFound(to.fullPath))
      }
    })
  },

  //
  WorkContent(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) return next(makeRoute.needSignIn());

      // Check accessibility (Work)
      if (validations.hasValidWork(to)) {
        next()
      } else {
        next(makeRoute.notFound(to.fullPath))
      }
    })
  },

  //
  FactorContent(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) return next(makeRoute.needSignIn());

      // Check accessibility (Factor)
      if (validations.hasValidFactor(to)) {
        next()
      } else {
        next(makeRoute.notFound(to.fullPath))
      }
    })
  },

  //
  PreviewPage(to, from, next) {
    guardCommonAsync().
    then(outcome => {
      if (outcome.shouldSignIn) return next(makeRoute.needSignIn());

      // Check accessibility (Work)
      if (validations.hasValidWork(to)) {
        next()
      } else {
        next(makeRoute.notFound(to.fullPath))
      }
    })
  }

};


/*
*/
let validations = {

  //
  hasValidWork(to) {
    return (typeof to.params.wid === 'string' && Store.referWork(to.params.wid))
  },

  //
  hasValidFactor(to) {
    if (typeof to.params.wid === 'string' && typeof to.params.fid === 'string') {
      let work = Store.referWork(to.params.wid)
      let factor = Store.referFactor(to.params.fid)
      if (
        work &&
        factor &&
        work.ownFactors.includes(to.params.fid)
      ) {
        return true
      }
    }
    return false
  }

};


