const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { page } = ctx.query
    const limit = 10
    const offset = (page - 1) * limit
    const booklist = await mysql('books')
                    .select('*').limit(limit).offset(offset)
                    .orderBy('id', 'desc')
    ctx.state.data = { booklist }
}