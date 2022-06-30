//对api进行统一的管理
import apirequest from './apiAjax'
import mockrequest from './mockAjax'

// 接口示例
// // 普通用户登录接口
export const reqUserLogin = (user) => apirequest({
  url: '/user/login',
  method: 'GET',
  params: {
    username: user.username,
    password: user.password,
  }
})

export const reqUserRegist = (user) => apirequest({
  url: '/user/regist',
  method: 'GET',
  params: {
    username: user.username,
    password: user.password,
  }
})

export const reqJobList = (token, userid, pagenum, pagesize) => apirequest({
  url: '/job/getjoblist',
  method: 'GET',
  params: {
    token,
    userid,
    pagenum,
    pagesize,
  }
})

export const reqPauseJob = (token, id) => apirequest({
  url: '/job/pausejob',
  method: 'GET',
  params: {
    token,
    id,
  }
})

export const reqStartJob = (token, id) => apirequest({
  url: '/job/startjob',
  method: 'GET',
  params: {
    token,
    id,
  }
})

export const reqDeleteJob = (token, id) => apirequest({
  url: '/job/deletejob',
  method: 'DELETE',
  params: {
    token,
    id,
  }
})

export const reqFileList = (token, userid, parentdirid, pagenum, pagesize) => apirequest({
  url: '/file/getfilelist',
  method: 'GET',
  params: {
    token,
    userid,
    parentdirid,
    pagenum,
    pagesize,
  }
})

export const reqMKDir = (token, userid, dirname, dirpath, parentdirid) => apirequest({
  url: '/file/mkdir',
  method: 'GET',
  params: {
    token,
    userid,
    dirname,
    dirpath,
    parentdirid,
  }
})

export const reqUploadFile = (token, userid, dirpath, parentdirid, data) => apirequest({
  url: '/file/uploadfile',
  method: 'POST',
  params: {
    token,
    userid,
    dirpath,
    parentdirid,
  },
  data: data
})

export const reqUpdataFileName = (token, userid, newname, oldname, id, dirpath) => apirequest({
  url: '/file/updatename',
  method: 'GET',
  params: {
    token,
    userid,
    newname,
    oldname,
    id,
    dirpath,
  },
})

export const reqDeleteFile = (token, name, id, dirpath, isfile) => apirequest({
  url: '/file/deletefile',
  method: 'DELETE',
  params: {
    token,
    name,
    id,
    dirpath,
    isfile
  },
})

export const reqDeleteFiles = (token, names, ids, dirpath) => apirequest({
  url: '/file/deletefiles',
  method: 'DELETE',
  params: {
    token,
    names,
    ids,
    dirpath
  },
})

export const reqStartIDE = (token, userid) => apirequest({
  url: '/ide/start',
  method: 'GET',
  params: {
    token,
    userid,
  },
})

export const reqStopIDE = (token, userid) => apirequest({
  url: '/ide/stop',
  method: 'GET',
  params: {
    token,
    userid,
  },
})