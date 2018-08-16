const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const toplist = await mysql('books').select('id', 'image').orderBy('count', 'desc').limit(9)
    ctx.state.data = { toplist }
}