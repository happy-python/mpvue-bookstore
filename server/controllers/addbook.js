const request = require('request')
const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { isbn,  open_id } = ctx.query
    if (isbn) {
        const bookinfo = await getJSON(`https://api.douban.com/v2/book/isbn/${isbn}`)
        if (bookinfo.title) {
            const rating = bookinfo.rating.average
            const author = bookinfo.author.join(',')
            const { title, image, publisher, alt, summary, price } = bookinfo
            try {
                await mysql('books').insert({ isbn, open_id, title, image, publisher, alt, summary, price, rating, author })
                ctx.state.data = { title }
            } catch (error) {
                ctx.state.code = -1
                ctx.state.data = { error: error.sqlMessage }
            }
        }
    }
}

async function getJSON(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            body = JSON.parse(body)
            if (response && response.statusCode === 200) {
                resolve(body)
            } else {
                reject(body.msg)
            }
        })
    })
}