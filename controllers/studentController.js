const mysqlPool = require("../config/dbconnect.js");

const getStudents = async(req,res) =>{
    try {
        const data = await mysqlPool.query('SELECT * FROM student')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Record Not Found'

            })
        }
        res.status(200).send({
            success:true,
            message:'Record Found',
            data:data[0]

        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error',
            error
        })
    }

};

const getStudentsbyId = async(req,res) =>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Id not found'

            })
        }   
        const data = await mysqlPool.query(`SELECT * FROM student WHERE id=?`,[id])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Record Not Found'

            })
        }
        res.status(200).send({
            success:true,
            message:'Record Found',
            data:data[0]

        })

        
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error',
            error
        })
    }

 
}

const createStudent = async (req, res) => {
    try {
        const { name, roll_no, fee, classes, medium } = req.body;

        // Validate required fields
        if (!name || !roll_no || !fee || !classes || !medium) {
            return res.status(400).send({
                success: false,
                message: 'Provide all fields',
            });
        }

        // Proper SQL syntax for INSERT
        const data = await mysqlPool.query(
            'INSERT INTO student (name, roll_no, fee, classes, medium) VALUES (?, ?, ?, ?, ?)',
            [name, roll_no, fee, classes, medium]
        );

        // Check if insertion was successful
        if (!data || data.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Failed to add record',
            });
        }

        res.status(201).send({
            success: true,
            message: 'Record Added',
            data: {
                id: data.insertId, // Assuming MySQL returns the last inserted ID
                name,
                roll_no,
                fee,
                classes,
                medium,
            },
        });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send({
            success: false,
            message: 'An unexpected error occurred',
            error: error.message || error,
        });
    }
};
const updateStudent = async(req,res) => {
    try {
        const id = req.params.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Id not found'

            })
        }
        const {name, roll_no, fee, classes, medium}=req.body
        const data = await mysqlPool.query(`UPDATE  student SET name=?, roll_no=?, fee=?, classes=?, medium=? WHERE id=?`,[name, roll_no, fee, classes, medium, id])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Record Not Found'

            })
        }
        res.status(200).send({
            success:true,
            message:'Details Updated'

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error',
            error
        })
        
    }
}
const deleteStudent = async(req,res) =>{
    try {
        const id =req.params.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Id not found'

            })
        }
        const data = await mysqlPool.query(`DELETE FROM student WHERE id=? `,[id])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Record Not Found'

            })
        }
        res.status(200).send({
            success:true,
            message:'Record deleted'

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error',
            error
        })
        
    }
}


module.exports={
    getStudents,
    getStudentsbyId,
    createStudent,
    updateStudent,
    deleteStudent
}