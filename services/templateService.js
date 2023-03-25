const globalSettings = require('../config');
const templateRepository = require('../repositories/templateRepository')
const jwt = require('jsonwebtoken');
const docxTemplates = require('docx-templates');
const fs = require('fs')

module.exports.getAll = async (params = {}) => {
    const data = await templateRepository.getAll(params)
    return data
};

module.exports.getTemplate = async (id) => {
    const data = await templateRepository.getTemplate(id)
    return data
};

module.exports.editTemplate = async (id, datos) => {
    
    const data = await templateRepository.updateTemplate(id, datos)
    return data
};

module.exports.deleteTemplate = async (id) => {
    const data = await templateRepository.deleteTemplate(id)
    return data
};


module.exports.saveTemplate = async (datos, file) => {
    const insertData = {
        title: datos.title, 
        description: datos.description, 
        template_info: file, 
        category_id: datos.category_id, 
        params: datos.params
    };
    const data = await templateRepository.saveTemplate(insertData)
    return data
};

module.exports.processTemplate = async (path, datos) => {
    try {
        const plantilla = fs.readFileSync(path);
        const buffer = await docxTemplates.createReport({
            template: plantilla,  
            cmdDelimiter: globalSettings.delimitadores, // Delimitadores
            data: datos,
            failFast: false,
            literalXmlDelimiter: '||',
            processLineBreaks: true,
            noSandbox: false,
            rejectNullish: false,
            fixSmartQuotes: false,
            errorHandler: (err, command_code) => {
              return '';
            },
        });
        const d = new Date();
        let ms = d.toLocaleDateString().replace(/[\/]+/g,"_");
        let nombrearchivo = `Archivo_Procesado_${ms}`
        await fs.writeFileSync(`public/templates/${nombrearchivo}.docx`, buffer);  
        return {
            msg: `Se creo el archivo`,
            url: `${globalSettings.urlGlobal}/templates/${nombrearchivo}.docx`
        };      
    } catch (error) {
        return {error: `${error}`};
    }
};