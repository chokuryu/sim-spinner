/**
*
* js
*
*/

// js-cookie can not call with import. So, use require.
const Cookies = require('js-cookie/src/js.cookie')
// import Cookies from 'js-cookie/src/js.cookie'

//
const Resource = {

  setup(mode = 'production') {

    //
    let userAccessor = new UserAccessor();

    userAccessor.setStab('get-status', (url, data) => {
      //
      let str = Cookies.get('_ssid_expires')
      let exp = str ? new Date(Number(str)) : 0;
      let isLiving = (exp > Date.now())
      //
      return {
        data: {
          isSessionLiving: isLiving
        }
      };
    });
    userAccessor.setStab('sign-in', (url, data) => {
      let exp = Date.now() + 1*60*60*1000;// 1h
      Cookies.set('_ssid_expires', ''+exp, { expires: 7 })
      return {
        data: {
          isSucceeded: true,
          ssid: 'id'+Date.now()
        }
      };
    });
    userAccessor.setStab('sign-out', (url, data) => {
      Cookies.remove('_ssid_expires')
      return {
        data: {
          isSucceeded: true
        }
      };
    });

    //
    this.userService = new UserService(userAccessor);
  }

};

/*
*/
let UserService = class UserService {

  //
  constructor(accessor) {
    this.accessor = accessor
  }

  //
  hasLivingSession() {
    return Promise.resolve().then(r => {
      let ssid = Cookies.get('ssid')
      let result = new ServiceResult();
      result.has = !!(ssid)
      return result
    })
  }

  //
  signIn(uid='', pass='') {
    let params = { uid, pass }
    let promise = Promise.resolve()
    .then(arg => this._accessAsyncTo('sign-in', params))
    .then(data => {
      let result = new ServiceResult({ data });
      if (data && data.isSucceeded) {
        Cookies.set('ssid', data.ssid, { expires: 1 })
        result.completeSignIn = true
      } else {
        Cookies.remove('ssid')
        result.completeSignIn = false
      }
      return result
    })
    return promise
  }

  //
  signOut() {
    let params = { ssid: Cookies.remove('ssid') }
    let promise = Promise.resolve()
    .then(arg => this._accessAsyncTo('sign-out', params))
    .then(data => {
      let result = new ServiceResult({ data });
      if (data && data.isSucceeded) {
        Cookies.remove('ssid')
        result.completeSignOut = true
      } else {
        result.completeSignOut = false
      }
      return result
    })
    return promise
  }

  //
  _accessAsyncTo(url, params) {
    let promise = Promise.resolve()
    .then(aug => this.accessor.request(url, params))
    .then(accessResult => {
      return accessResult.data
    })
    return promise
  }

}

/*
*/
let ServiceResult = class ServiceResult {
  constructor(opt = {}) {
    this.data = opt.data || null
  }
}

// ==============



/*
*/
let BaseAccessor = class BaseAccessor {

  constructor() {
    this._stabFactories = {
      // [url]: func( url:string, params:object )
    }
  }

  setStab(url, func) {
    this._stabFactories[url] = func
  }

  request(url, params = {}) {
    return new Promise((resolve, reject) => {
      setTimeout( x => {
        if (typeof this._stabFactories[url] !== 'function') {
          reject(Error('no stab'))
        } else {
          let accessResult = this._stabFactories[url](url, params)
          resolve(accessResult);
        }
      }, 200);
    });
  }

}

/*
*/
let UserAccessor = class UserAccessor extends BaseAccessor {

  constructor() {
    super()
  }

}





export default Resource;
