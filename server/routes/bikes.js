const express = require('express');
const router = express.Router();
const Bike = require('../models/bike')

/* GET available bikes */
router.get("/available", async (req, res) => {
  try {
    const availableBikes = await Bike.find({available: true}).populate()

    res.status(200).json({
      status: "success",
      results: availableBikes.length,
      bikes: availableBikes
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

/* GET rented bikes */
router.get("/rented", async (req, res) => {
  try {
    let rentedBikes = await Bike.find({rented: true}).populate()

    let discountBikes = rentedBikes.reduce((result, bike) => {
      if ((Math.abs(new Date().getTime() - bike.rentedAt.getTime()) / 3600000) >= 20 && !bike.discountedPriceOnce) {  ///1000 - sec, 60000 - min, 3600000 - hrs
        result.push({id: bike._id, price: bike.price});
      }
      return result;
    }, []);

    for (let bike of discountBikes) {
      await Bike.findOneAndUpdate(
        {_id: bike.id},
        {
          price: bike.price / 2,
          discountedPriceOnce: true
        }
      )
    }

    rentedBikes = await Bike.find({rented: true}).populate()

    res.status(200).json({
      status: "success",
      results: rentedBikes.length,
      bikes: rentedBikes,
      discountBikes: discountBikes
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

/* GET list of types */
router.get("/types", async (req, res) => {
  try {
    const bikeTypes = ['Mountain', 'Sport', 'Casual',
      'Road', 'Custom', 'Touring',
      'Fitness', 'Track', 'BMX']

    res.status(200).json({
      status: "success",
      results: bikeTypes.length,
      types: bikeTypes
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

/* POST bike */
router.post("/available/create", async (req, res) => {
  console.log(req.body);

  try {
    const bike = await new Bike({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      available: true,
      rented: false,
      updatedAt: null,
      discountedPriceOnce: false
    })

    await bike.save()

    res.status(201).json({
      status: "success",
      bike: bike,
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

/* PATCH cancel rented bike */
router.patch("/move-available-rented/:id", async (req, res) => { //peredaem avail rented + price
  console.log(req.body);

  try {
    const currentBike = await Bike.findOne({ _id: req.params.id })
    const bikeToUpdate = await Bike.findOneAndUpdate(
      {_id: req.params.id},
      {
        price: Boolean(currentBike.discountedPriceOnce) ? currentBike.price*2 : currentBike.price,
        available: req.body.available,
        rented: req.body.rented,
        rentedAt: Boolean(req.body.rented) ? new Date() : null,
        discountedPriceOnce: false
      }
    )

    await bikeToUpdate.save()

    res.status(201).json({
      status: "success",
      bike: bikeToUpdate,
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

/* DELETE an available bike */
router.delete("/available/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    await Bike.findOneAndDelete({_id: req.params.id})

    res.status(202).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
}); //✔️

module.exports = router;
