const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
        status: 200,
        data: true
    }
  }
}

module.exports = LoginController;