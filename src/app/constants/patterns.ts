export const PATTERNS = {
    documento: /^[0-9]{0,8}/,
    cuil: /([0-9]{2})-([0-9]{8})-([0-9]{1})/i,
    nombres: /[a-záéíóúùñÑ ]{0,50}/i,
    telefono: /([0-9]{2}[0-9]{4}[0-9]{4})/,
    string: /^[a-záéíóúùñÑ\s]+$/gi,
    number: /^[0-9]+$/g,
    currency: /\$\s?([0-9])?((([0-9]{1,3})\.){0,})?([0-9]{0,3})\,([0-9]{1,2})?/,
    email: /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/,
    codigoPostal: /[a-zA-Z0-9]/,
    calles: /[a-záéíóúùñÑ0-9\s]/i,
    colorHexa: /^[0-9A-F]{6}\b/ig,
    hexa: /^[0-9A-F]+$/i
}