const express = require('express')
const fs = require('fs-extra')
const shortid = require('shortid')
const { MongoClient, ObjectID } = require('mongodb')
const mongoServerURL = 'mongodb://localhost:27017'

getStudents = async (filter = {}) => {
    try {
        const mongo = await MongoClient.connect(mongoServerURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        const collection = mongo.db('strivestudents').collection('students')
        const students = collection.find(filter).toArray()
        return students ? students : []
    } catch (error) {
        console.log(error)
    }
}


const router = express.Router();

router.get('/', async (req, res) => {
    const students = await getStudents(req.query);
    res.send(students)
})


router.get("/:id", async (req, res) => {
    try {
        const student = await getStudents({ _id: new ObjectID(req.params.id) });
        res.send(student)

    } catch (error) {

    }
})



router.post('/', async (req,res) => {
   try {
    const mongo = await MongoClient.connect(mongoServerURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true


    })

 const collection = mongo.db("strivestudents").collection("students")
 console.log(req.body)
 console.log(req)
 const response =  await collection.insertOne(req.body) 
 console.log(response)
 res.send('Ok')
       
   } catch (error) {
       console.log(error)
   }
    




})


router.put("/:id", async (req, res) => {
    try {
        const mongo = await MongoClient.connect(mongoServerURL, {
            useNewUrlParser: true
        })

        const collection = mongo.db("strivestudents").collection("students")

        const {modifiedCount} = await collection.updateOne({ _id: new ObjectID(req.params.id) }, { $set: (req.body) })

        if (modifiedCount > 0) {
            res.send('OK')
        } else {
            res.send('NOTHING TO MODIFY')
        }

    } catch (error) {

    }
})



router.delete("/:id", async (req, res) => {
    try {
        const mongo = await MongoClient.connect(mongoServerURL, {
            useNewUrlParser: true
        })
        const collection = mongo.db("strivestudents").collection("students")
        const {deletedCount} = await collection.deleteOne({ _id: new ObjectID(req.params.id) });
        if (deletedCount > 0) {
            res.send('OK')
        } else {
            res.send('NOTHING TO DELETE')
        }
    } catch (error) {
    }
})

module.exports = router