const express = require("express");
const ShopifyData = require("../Model/index");
const router = new express.Router();

//post request
//hospitality req
router.post("/check", async (req, res) => {
  const shopData = new ShopifyData(req.body);
  // console.log(shopData);
  try {
    await shopData.save();
    res.status(201).send(shopData);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/order/data", async (req, res) => {
  let order = [];
  const orderkey = [];
  let eventFinalData = {};
  try {
    const event = ShopifyData.find(function(e, data) {
      if (e) res.status(400).send(e);
      let eventFinalData = {};
      eventFinalData.code = 0;
      let message = [];
      let eventData = [];
      data.forEach(d => {
        order.push(d);
      });
      // message.shift();
      eventFinalData.message = order;
      res.status(200).send(eventFinalData);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.patch("/order/update", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const shop = await ShopifyData.findOne({ _id: req.body.id });
    if (!shop) {
      return res.status(404).send("error");
    }
    // console.log(updates);
    // const shop2 = JSON.parse(shop);
    // console.log(typeof (shop['email']));
    updates.map(update => {

        console.log(shop[update]);
      shop[update] = req.body[update];

    });
    await shop.save();
    res.send(shop);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
//5e5ba34ca14513317fee58f1
