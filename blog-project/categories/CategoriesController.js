const express = require('express')
const router = express.Router()
const slugify = require('slugify')
const Category = require('./Category')


router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/save', (req, res) => {
    var title = req.body.title
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('../views/admin/categories/index', { categories: categories })
    })
})

router.post('/categories/delete', (req, res) => {
    var id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect('/admin/categories')
            })
        } else { // NAN
            res.redirect('/admin/categories')
        }
    } else { // NULL
        res.redirect('/admin/categories')
    }
})

router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }

    Category.findByPk(id)
        .then(category => {
            if (category != undefined) {
                res.render('../views/admin/categories/edit', { category: category })
            } else {
                res.redirect('/admin/categories')
            }
        }).catch(error => {
            res.redirect('/admin/categories')
        })
})


router.post('/categories/update', (req, res) => {
    var title = req.body.title
    var id = req.body.id

    Category.update({title: title, slug: slugify(title)}, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/categories')
    })
})








module.exports = router








