const globalSettings = require('../config');
const kquery = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

module.exports.getAll = (params = {}) => {
    return kquery("templates")
        .where(function() {
            if(params.category_id) {
                this.where('category_id', params.category_id)
            }
        })
        .select('id', 'title', 'description', 'template_info', 'params')     
}

module.exports.getTemplate = (id) => {
    return kquery("templates")
        .where('id', id)
        .select('id', 'title', 'description', 'template_info', 'params') 
        .first()
}

module.exports.deleteTemplate = (id) => {
    return kquery("templates")
        .where('id', id)
        .del()
}

module.exports.updateTemplate = (id, datos) => {
    return kquery("templates")
        .where({ id: id })
        .update(datos) 
}

module.exports.saveTemplate = (datos) => {
    return kquery("templates")
        .insert(datos)
        .returning("*")
        .then(templates => {
            const template = templates[0]
            return template
        }).catch(error => {
            return { error: error.message }
        }) 
}