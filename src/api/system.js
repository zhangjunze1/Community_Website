// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 用户注册
 * @param name
 * @param password
 * @param password1
 * @param phone
 * @param email
 * @returns {AxiosPromise}
 */
export const systemRegister = (name, password, password1, phone, email) => {
  return request({
    url: '/user/register',
    method: 'POST',
    params: {
      name,
      password,
      password1,
      phone,
      email
    }
  })
}

/**
 * 后台系统 获取用户列表
 * @param current
 * @param size
 * @param userName
 * @returns {AxiosPromise}
 */
export const findqueryUserList = (current, size, userName) => {
  return request({
    url: '/user/queryUserList',
    method: 'POST',
    params: {
      current,
      size,
      userName
    }
  })
}

/**
 * 查找分类Level 1列表
 * @param current
 * @param size
 * @returns {AxiosPromise}
 */
export const findSortList = (current, size) => {
  return request({
    url: '/sort/findSortList',
    method: 'POST',
    params: {
      current,
      size
    }
  })
}

/**
 * 查找分类Level 1列表 全部无分页
 * @returns {AxiosPromise}
 */
export const findSortList1 = () => {
  return request({
    url: '/sort/findSortListNoPage',
    method: 'POST',
    params: {}
  })
}

/**
 * 增加Level 1 的分类
 * @param sortname
 * @returns {AxiosPromise}
 */
export const addNewSort = (sortname) => {
  return request({
    url: '/sort/addSortOne',
    method: 'POST',
    params: {
      sortname
    }
  })
}

/**
 * 删除第一分类
 * @param sortName
 * @returns {AxiosPromise}
 */
export const deleteSort = (sortName) => {
  return request({
    url: '/sort/deleteSort',
    method: 'POST',
    params: {
      sortName
    }
  })
}

/**
 * 获取某一第一分类的视频分类的 第二分类所有视频分类标签
 * @param current
 * @param size
 * @param sortName
 * @returns {AxiosPromise}
 */
export const findSecondSortList = (current, size, sortName) => {
  return request({
    url: '/sort/findSecondSortList',
    method: 'POST',
    params: {
      current,
      size,
      sortName
    }
  })
}

/**
 * 获取某一第一分类的视频分类的 第二分类所有视频分类标签
 * @param sortName
 * @returns {AxiosPromise}
 */
export const findSecondSortList1 = (sortName) => {
  return request({
    url: '/sort/findSecondSortListNoPage',
    method: 'POST',
    params: {
      sortName
    }
  })
}

/**
 * 添加新的第二分类到对应的第一分类中
 * @param sortName
 * @param preSortName
 * @returns {AxiosPromise}
 */
export const addNewSecondSort = (sortName, preSortName) => {
  return request({
    url: '/sort/addNewSecondSort',
    method: 'POST',
    params: {
      sortName,
      preSortName
    }
  })
}

/**
 * 删除第二分类
 * @param sortName
 * @param preSortName
 * @returns {AxiosPromise}
 */
export const deleteSecondSort = (sortName, preSortName) => {
  return request({
    url: '/sort/deleteSecondSort',
    method: 'POST',
    params: {
      sortName,
      preSortName
    }
  })
}

/**
 * 查找对应视频列表
 * @param current
 * @param size
 * @param sort
 * @param research
 * @returns {AxiosPromise}
 */
export const findVideoList = (current, size, sort, research) => {
  return request({
    url: '/video/queryVideoList',
    method: 'GET',
    params: {
      current,
      size,
      sort,
      research
    }
  })
}

/**
 * 获取视频url
 * @param data
 * @returns {AxiosPromise}
 */
export const addVideo = (data) => {
  return request({
    url: '/oss/uploadVideoFile',
    method: 'POST',
    data: data
  })
}

/**
 * 查找所有second 分类
 * @returns {AxiosPromise}
 */
export const findSecondSortListAll = () => {
  return request({
    url: '/sort/findSecondSortListAll',
    method: 'POST',
    params: {}
  })
}

/**
 * 发布视频
 * @param videoSub
 * @param videoDescribe
 * @param mainSort
 * @param videoUrl
 * @param userName
 * @returns {AxiosPromise}
 */
export const addNewVideo = (videoSub, videoDescribe, mainSort, videoUrl, userName) => {
  return request({
    url: '/video/addNewVideo',
    method: 'POST',
    params: {
      videoSub,
      videoDescribe,
      mainSort,
      videoUrl,
      userName
    }
  })
}

/**
 * 登录美食社区
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
