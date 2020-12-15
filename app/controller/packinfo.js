const Controller = require('egg').Controller;

class PackinfoController extends Controller {
    async create () {
        const { ctx } = this
        const param = {
            ...ctx.request.body,
            createTime: new Date().getTime()
        }
        const res = await ctx.service.packinfo.create(param)
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '插入失败'
            }
        }
    }
    async getAll () {
        const { ctx } = this
        const res =  await ctx.service.packinfo.getAll()
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '查询失败'
            }
        }
    }
    async getinfo () {
        const { ctx } = this
        const env = ctx.request.query.env
        const res = await ctx.service.packinfo.getInfo(env)
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '查询失败'
            }
        }
    }
    async deleteItem () {
        const { ctx } = this
        const id = ctx.request.body.id
        const res = await ctx.service.packinfo.deleteItem({ id })
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '删除失败'
            }
        }
    }
    async getList () {
        const { ctx } = this
        const obj = {
            userName: 'userName',
            branch: 'branch',
            env: 'env'
        }
        const name = ctx.request.query.name
        if (!obj[name]) {
            ctx.body = {
                status: 500,
                errMsg: '查询条件为空'
            }
            return
        }
        const res = await ctx.service.packinfo.getList(obj[name])
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '查询失败'
            }
        }
    }
    async getAllByParam () {
        const { ctx } = this
        const { userName, env, branch, column, order, ...page } = ctx.request.body
        const param = {}
        if (userName) {
            param.userName = userName
        }
        if  (env) {
            param.env = env
        }
        if (branch) {
            param.branch = branch
        }
        const offset = (page.current - 1) * page.pageSize
        const res =  await ctx.service.packinfo.getAllByParam(param, offset, column, order, page.pageSize)
        if (res) {
            ctx.body = {
                status: 200,
                data: res
            }
        } else {
            ctx.body = {
                status: 500,
                errMsg: '查询失败'
            }
        }
    }
}
module.exports = PackinfoController;