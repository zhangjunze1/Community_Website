// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 系统展示注册
 * @param name
 * @param password
 * @param password1
 * @param inviteCode
 * @returns {AxiosPromise}
 */
export const systemRegister = (name, password, password1, inviteCode) => {
  return request({
    url: '/sysUser/register',
    method: 'POST',
    params: {
      name,
      password,
      password1,
      inviteCode
    }
  })
}

/**
 * 登录展示系统
 * @param name
 * @param password
 * @returns {AxiosPromise}
 */
export const systemLogin = (name, password) => {
  return request({
    url: '/sysUser/login',
    method: 'POST',
    params: {
      name,
      password
    }
  })
}

/**
 * 获取初始数据参数
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const findInitDataList = (invitationCode) => {
  return request({
    url: '/geneSequencing/getAllYearAndSerotypeAndProvince',
    method: 'GET',
    params: {
      invitationCode
    }
  })
}

/**
 * 获取查询检索数据
 * @param current
 * @param size
 * @param year
 * @param province
 * @param serotype
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const findDataRetrievalList = (current, size, year, province, serotype, invitationCode) => {
  return request({
    url: '/geneSequencing/searchAllInformation',
    method: 'POST',
    params: {
      current,
      size,
      year,
      province,
      serotype,
      invitationCode
    }
  })
}

/**
 * 获取下载全体查询检索数据
 * @param year
 * @param province
 * @param serotype
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const findDownloadDataRetrievalList = (year, province, serotype, invitationCode) => {
  return request({
    url: '/geneSequencing/searchAllInformationDownload',
    method: 'POST',
    params: {
      year,
      province,
      serotype,
      invitationCode
    }
  })
}

/**
 * 下载数据
 * @param current
 * @param size
 * @param year
 * @param province
 * @param serotype
 * @param invitationCode
 * @returns {AxiosPromise}
 * @constructor
 */
export const DownloadDataRetrievalList = (current, size, year, province, serotype, invitationCode) => {
  return request({
    url: '/geneSequencing/searchAllInformation',
    method: 'POST',
    params: {
      current,
      size,
      year,
      province,
      serotype,
      invitationCode
    },
    responseType: 'blob'
  })
}

/**
 * 获取title ClassName
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const findDataTitleList = (invitationCode) => {
  return request({
    url: '/geneSequencing/getClassName',
    method: 'GET',
    params: {
      invitationCode
    },
    responseType: 'blob'
  })
}

/**
 * 获取USER List
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const findUserList = (current, size, invitationCode) => {
  return request({
    url: '/sysUser/searchAllUserInformation',
    method: 'POST',
    params: {
      current,
      size,
      invitationCode
    }
  })
}
