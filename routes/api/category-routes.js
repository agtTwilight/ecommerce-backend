const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({include:[Product]}).then(data => {
    res.json(data);
  }).catch(err=>{d
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include:[Product]
}).then(data=>{
    if(data){
       return  res.json(data);
    } else {
        res.status(404).json({
            msg:"no such record"
        })
    }
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
})
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(data => {
    if(data[0]){
      return res.json(data)
  } else {
      return res.status(404).json({msg:"no such record"})
  }
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
        id:req.params.id
    }
}).then(data=>{
    if(data){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
  })
});

module.exports = router;
