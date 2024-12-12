const express = require("express")
const {getStudents, createStudent, updateStudent, deleteStudent}= require("../controllers/studentController.js")
const { getStudentsbyId }= require("../controllers/studentController.js")
const router = express.Router()


router.get('/list',getStudents)
router.get('/list/:id',getStudentsbyId)
router.post('/create',createStudent)
router.put('/update/:id',updateStudent)
router.delete('/delete/:id',deleteStudent)


module.exports = router