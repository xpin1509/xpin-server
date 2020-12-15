const Server = require('axios')
const CryptoJS = require('crypto')
const Controller = require('egg').Controller;

class DingDingMsg extends Controller {
  async send() {
    const { ctx } = this
    const { url, secret, msg } = ctx.request.body
    if (!url || !secret || !msg) {
      ctx.body = {
        status: 500,
        errMsg: 'url, secret, msg均不能为空'
      }
    }
    try {
      const res = await sendMsg(url, secret, msg)
      ctx.body = {
        status: 200,
        data: res
      }
    } catch (e) {
      ctx.body = {
        status: 500,
        errMsg: '发送失败'
      }
    }
  }
}

const sendMsg = async (url, secret, Msg) => {
    const timestamp = Date.now()
    const stringToSign = timestamp + "\n" + secret
    const sign = CryptoJS.createHmac('sha256', secret).update(stringToSign).digest("base64")
    const signUrlencode = encodeURIComponent(sign)
    try {
      const { data } = await Server({
        url: url + `&timestamp=${timestamp}&sign=${signUrlencode}`,
        method: "POST",
        data: Msg
      })
      return data
    } catch (e) {
      return e
    }
}

module.exports = DingDingMsg;
