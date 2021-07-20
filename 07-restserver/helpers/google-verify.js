
const {OAuth2Client} = require('google-auth-library');
const { verify } = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async(idToken = '') => {

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    //renombrando campos
    const {name: nombre
         , picture: img
         , email: correo } = ticket.getPayload();
    return {nombre, img, correo};  
}

module.exports = {
    googleVerify
}