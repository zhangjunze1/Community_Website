// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 获取Host echarts信息
 * @returns {AxiosPromise}
 */
export const getDoughnutChartsData = (invitationCode) => {
  return request({
    url: '/geneSequencing/getGroupHost',
    method: 'GET',
    params: {
      invitationCode
    }
  })
}

/**
 * 获取Serotype echarts信息
 * @returns {AxiosPromise}
 */
export const getSerotypeChartsData = (invitationCode) => {
  return request({
    url: '/geneSequencing/getGroupSerotype',
    method: 'GET',
    params: {
      invitationCode
    }
  })
}

/**
 * 获取Province echarts信息
 * @returns {AxiosPromise}
 */
export const getProvinceChartsData = (invitationCode) => {
  return request({
    url: '/geneSequencing/getGroupProvince',
    method: 'GET',
    params: {
      invitationCode
    }
  })
}

/**
 * 獲取Province Year的信息
 * @param invitationCode
 * @returns {AxiosPromise}
 */
export const getGroupYearChartsData = (invitationCode) => {
  return request({
    url: '/geneSequencing/getGroupYear',
    method: 'GET',
    params: {
      invitationCode
    }
  })
}
