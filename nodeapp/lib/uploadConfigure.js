const multer = require('multer');

// declaro una configuración de upload
const upload = multer({ dest: 'uploads/' });

module.exports = upload;