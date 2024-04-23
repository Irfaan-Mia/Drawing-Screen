const path = require('path')
const express = require('express')
const router = express.Router()
const classList = require('./classList.js') // our class list array

router.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'class', 'index.html'))
})
router.get('/create', function (req, res) {
res.sendFile(path.join(__dirname, 'views', 'create.html'))
})

router.get('/delete', function (req, res) {
res.sendFile(path.join(__dirname, 'views',  'delete.html'))
})

router.get('/edit', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'edit.html'))
    })

        router.get('/drawbyIrfaan', function (req, res) {
            res.sendFile(path.join(__dirname, 'views', 'drawbyIrfaan.html'))
            })


    module.exports = router

// RESTful api
router.get('/api/list', function (req, res) {
    res.json(classList.getList()) // Respond with JSON
    })

    router.get('/api/get/:id', function (req, res) {
    res.json(classList.get(req.params.id)) // Notice the wildcard in the URL?
    // Try browsing to /api/get/0 once you've added some entries
    })

    router.post('/api/create', function (req, res) {
        console.log('Adding the following student:', req.body.student)
        classList.add(req.body.student);
        res.redirect(req.baseUrl)
        })

    router.post('/api/delete/:id', function (req, res) {
    console.log('this will delete a student entry: ', req.params)
    if(!isNaN(parseInt(req.params.id)))
    {
    classList.delete(req.params.id);
    res.json({message: 'Deleted student entry'});
    }
    })

    router.post('/api/edit/:id', function (req, res) {
        console.log('this will edit a student entry: ' + req.params.id + " " + req.body.newName);
        classList.edit(req.body.newName,req.params.id);
        res.json({message: 'Student was added succesfully'});
        })

            router.post('/api/draw/:id', function (req, res) {
                console.log("Student will drawl");
                res.redirect(req.baseUrl + "/draw");
        })
        