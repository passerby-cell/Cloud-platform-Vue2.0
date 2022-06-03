//对api进行统一的管理
import apirequest from './apiAjax'
import mockrequest from './mockAjax'

// 接口示例
// // 首页三级联动接口
export const reqCategoryList = () => apirequest({
  url: '/product/getBaseCategoryList',
  method: 'GET',
})

// // 轮播图接口
// export const reqBannerList = () => mockrequest({
//   url: '/banner',
//   method: 'GET',
// })
// export const reqFloorList = () => mockrequest({
//   url: '/floor',
//   method: 'GET',
// })

// //获取搜索模块数据
// export const reqSearchList = (data) => apirequest({
//   url: '/list',
//   method: 'POST',
//   data: data,
// })

// //获取详情页面数据
// export const reqDetailList = (data) => apirequest({
//   url: `item/${data.skuId}`,
//   method: 'GET',
// })