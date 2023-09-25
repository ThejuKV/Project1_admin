const { v4: uuidv4 } = require('uuid');

function generateHexadecimalId() {
    const uuid = uuidv4();
    const hexadecimalId = uuid.replace(/-/g, '');
    return hexadecimalId;
}
module.exports = { generateHexadecimalId };