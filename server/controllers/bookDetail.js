const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { id } = ctx.query
    await mysql('books').select('*').where('id', '=', id).increment('count', 1)
    const book = await mysql('books').select('books.*', 'cSessionInfo.user_info').where('id', '=', id).join('cSessionInfo', 'books.open_id', 'cSessionInfo.open_id').first()
    book.user_info = JSON.parse(book.user_info)
    book.summary = book.summary.split('\n')
    ctx.state.data = { book }
}