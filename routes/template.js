const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const router = express.Router();
const multer = require('multer')

// upload file path
const TEMPLATE_PATH = 'templates'
// configure multer
const upload = multer({
  dest: `${TEMPLATE_PATH}`
})

router.get("/", dashboardController.home);
router.get("/:id(\\d+)", dashboardController.template);
router.post("/procesar/:id(\\d+)", dashboardController.processTemplate);
router.post("/upload", upload.single('template'), dashboardController.upload_template);
router.post("/edit/:id(\\d+)", upload.single('template'), dashboardController.editTemplate);
router.post("/delete/:id(\\d+)", dashboardController.deleteTemplate);

module.exports = router;