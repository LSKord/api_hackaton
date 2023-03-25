const config = {
    db: {
      port: 3306,
      host: "localhost",
      user: "root",
      password: '',
      database: "plantillas",
      environment: 'development',
    },
    urlGlobal: 'http://localhost:3000',
    delimitadores: ['<<', '>>'], // Delimtadores para WORD
    secretkeyjwt: '7baf50907fd34f772bbd161cd4df1029b5f612b7535a2ebd0c7ef92c8ab7a0bf25c03e1d72af28fd8a6b1a178a183fefceb8e4aa7c9edb1b6ce80157c5e09206',
    expiresJWTToken: '1800s' // Expiracion del token
};

module.exports = config