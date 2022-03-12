// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 管理员登录后台管理系统
 * @param name
 * @param password
 * @returns {AxiosPromise}
 */
export const adminLogin = (name, password) => {
  return request({
    url: '/sysUser/loginSysUser',
    method: 'POST',
    params: {
      name,
      password
    }
  })
}
