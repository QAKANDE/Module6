const express = require("express")
const db = require('../../database')

const router = express.Router()

router.post("/", async (req, res)=>{
    const response = await db.query("INSERT INTO cart (userid, productid) VALUES ($1, $2) RETURNING _id",
                                [ req.body.userid, req.body.productid])

    res.send(response.rows[0])
})

router.get("/:userId", async (req, res) => {
    const response = await db.query(`SELECT name,description,brand,imageurl,price as price_per_unit,category, 
    COUNT(*) As quantity, COUNT(*) * price as total
    FROM cart JOIN "products" ON cart.productid = "products"._id
                                     WHERE userid = $1
                                     GROUP BY "products"._id
                                     `, [ req.params.userId])
    res.send(response.rows)
})



module.exports = router;