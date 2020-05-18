export const request=(params)=>{
  return new Promise((resolve,reject)=>{/**resolve成功时执行的回调函数，reject失败时执行的回调函数 */
    wx.request({
      ...params,/**以参数形式传入，。。。为结构 */
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
  })
}