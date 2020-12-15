const Service = require('egg').Service

class ProductService extends Service {
    async create (param) {
        const { app } = this;
        try{
            const res =  await app.mysql.insert('webpack', param)
            return res
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
    async getInfo (env) {
        const { app } = this;
        const where = env && { env: env }
        try{
            const res =  await app.mysql.select('webpack', {
                where,
                orders: [['createTime','desc']], // 排序方式
                limit: 1, // 返回数据量
                offset: 0
            })
            return res
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
    
    async getAll () {
        const { app } = this;
        try{
            const res =  await app.mysql.select('webpack')
            return res
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
    async deleteItem (param) {
        const { app } = this;
        try{
            const res =  await app.mysql.delete('webpack', param)
            return res
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
    async getList (column) {
        const { app } = this;
        const sql = 'SELECT ' + column + ' FROM `webpack` GROUP BY '+ column + ';'
        try{
            const res =  await app.mysql.query(sql)
            return res
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
    async getAllByParam ( query = {}, offset = 0, column = 'createTime', order = 'desc', limit = 10,) {
        const { app } = this;
        column = column || 'createTime'
        order = order || 'desc'
        try{
            const res =  await app.mysql.select('webpack', {
                where: query,
                orders: [[column, order]], // 排序方式
                limit, // 返回数据量
                offset
            })
            const total = await app.mysql.count('webpack', query)
            return {
                list: res,
                total
            }
        }catch(err) {   
            console.log(err)
            return null 
        }
    }
}

module.exports = ProductService