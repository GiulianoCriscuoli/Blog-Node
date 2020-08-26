const multer = require('multer'); // recebimento do upload
const jimp = require('jimp'); // redimensionamento do upload recebido
const uuid = require('uuid'); // hash do upload


const  multerOptions = {
    storage: multer.memoryStorage(), // salva na memória o upload
    fileFilter: (req, file, next) => {  

        const allowed = ['image/jpeg', 'image/jpg', 'image/png']; // allowed é o array que contém os mimetypes que serão aceitos

        if(allowed.includes(file.mimetype)) { // se o mimetype é o que está em allowed

            next(null, true); // retorna true sem mensagem

        } else {

            next({ message: 'Arquivo não suportado!' }, false);
        }
    }

};


exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {

    if(!req.file) {

        next();
        return;

    }

    // gerando o arquivo

    const ext  = req.file.mimetype.split('/')[1]; // criando a extensão do arquivo
    let filename = `${uuid.v4()}.${ext}`; // criando o nome do arquivo com hash utilizando o uuid
    req.body.photo = filename; // manda o file para o corpo

    const photo = await jimp.read(req.file.buffer); // lê o arquivo
    await photo.resize(800, 800); // redimensionando largura e altura
    await photo.write(`./public/media/${filename}`); // informando onde será escrito o arquivo
    
    next();
    
}