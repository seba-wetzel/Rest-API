module.exports = {
    port:process.env.PORT  || 8888,
    db: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lingerie',
    SECRET_TOKEN : 'C5B3AAEAC9CA6DF451BFE9D1F210C060B01D616560808B51C17AD79A651570BB'
}