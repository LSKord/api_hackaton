const express = require('express');
const dashboardController = require('./dashboardController');
const templateService = require('../services/templateService')

module.exports.home = async (req, res, next) => {
    const params = req.params
    let data = await templateService.getAll(params)
    res.json({data})
};

module.exports.editTemplate = async (req, res, next) => {
    const { id } = req.params
    let datos = req.body
    if(req.file !== {})
    {
        datos.template_info = JSON.stringify(req.file ?? {})
    }
    let data = await templateService.editTemplate(id, datos)
    res.json(data === 1 ? {msg: 'Guardado con exito!'} : {error: 'No se guardo'})
};

module.exports.deleteTemplate = async (req, res, next) => {
    const { id } = req.params
    let data = await templateService.deleteTemplate(id)
    res.json(data === 1 ? {msg: 'Borrado con exito!'} : {error: 'No se borro!'})
};

module.exports.upload_template = async (req, res, next) => {
    let {Document} = require('docxyz');

    let datos = req.body
    const currentTemplate = req.file
    let document = new Document(currentTemplate.path);
    let text = document.text;
    let params = text.match(/\<{2}[aA-zZ._\-+*]+\>{2}$/gm);
    datos['params'] = params.map(x => x.replace("<<", "").replace(">>", "")).join(',')
    let id = await templateService.saveTemplate(datos, JSON.stringify(currentTemplate))
    let data = await templateService.getTemplate(id)    
    res.json(data)
};

module.exports.template = async (req, res, next) => {
    const { id } = req.params
    let data = await templateService.getTemplate(id)
    res.json(data)
};

module.exports.edit_template = async (req, res, next) => {
    const { id } = req.params
    let data = await templateService.getTemplate(id)
    res.json(data)
};

module.exports.processTemplate = async (req, res, next) => {
    const { id } = req.params
    const datos = req.body
    const template = await templateService.getTemplate(id)
    if (template && template.template_info) { 
    const { path } = JSON.parse(template.template_info)
    const comillas = template.params.toString().split(',')
    for (let index = 0; index < comillas.length; index++) {
        const element = comillas[index];  
        if(!datos[element]) {
            datos[element] = ''
        }       
    }

    let data = await templateService.processTemplate(path, datos)
    res.json(data)
}

  
    
};
  
  