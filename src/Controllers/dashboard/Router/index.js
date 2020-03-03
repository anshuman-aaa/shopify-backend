const express = require("express");
const ShopifyData = require("../Model/index");
const router = new express.Router();

//post request to add data
router.post("/check", async (req, res) => {
  const shopData = new ShopifyData(req.body);
  try {
    await shopData.save();
    res.status(201).send(shopData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get request to get all the order data
router.get("/order/data", async (req, res) => {
  let order = [];
  try {
    const event = ShopifyData.find(function(e, data) {
      if (e) res.status(400).send(e);
      let eventFinalData = {};
      eventFinalData.code = 0;
      data.forEach(d => {
        order.push(d);
      });
      eventFinalData.message = order;
      res.status(200).send(eventFinalData);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
//patch request to update a order
router.patch("/order/update", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const shop = await ShopifyData.findOne({ _id: req.body.id });
    if (!shop) {
      return res.status(404).send("error");
    }
    updates.map(update => {
      shop[update] = req.body[update];
    });
    await shop.save();
    res.send(shop);
  } catch (e) {
    res.status(400).send(e);
  }
});
//delete a order data
router.delete('/order/:id',  async (req, res) => {
  try {
    const shopData = await ShopifyData.findOneAndDelete({ _id: req.params.id})
    const sendData = {};
    sendData.id = 0;
    sendData.message = "order removed successfully";
    if (!shopData) {
      res.status(404).send(sendData)
    }
    res.send("removed")
  } catch (e) {
    res.status(500).send()
  }
});

module.exports = router;
