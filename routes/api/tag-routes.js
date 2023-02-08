const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({include:[Product]}).then(data => {
    res.json(data);
  }).catch(err=>{d
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
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
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
    Tag.update(req.body, {
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
  // delete on tag by its `id` value
  Tag.destroy({
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
