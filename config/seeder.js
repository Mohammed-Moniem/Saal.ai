const mongoose = require("mongoose");
const colors = require("colors");
const axios = require("axios");

const Customer = require("../Models/Customer");

mongoose.connect(process.env.LOCAL_MONGO_URI, {});
console.log(`DB CONNECTED`.blue.bold.inverse);

//Import into DB
const importData = async () => {
  const result = await axios.get(process.env.JSON_PLACEHOLDER_URL);
  try {
    await Customer.create(result.data);
    console.log(`Data Imported...`.green.inverse.bold);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red);
  }
};

//Destroy Data
const deleteData = async () => {
  try {
    await Customer.deleteMany();
    console.log(`Data Destroyed...`.red.inverse.bold);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red);
  }
};

//Add argument to specify the command to be executed
if (process.argv[2] !== "-import" && process.argv[2] !== "-destroy") {
  console.log(
    `you entered ${process.argv[2]}, you need to use either -import to import the data or -destroy to delete data, please exit and try again`
      .red.bold
  );
} else {
  if (process.argv[2] === "-import") {
    importData();
  } else if (process.argv[2] === "-destroy") {
    deleteData();
  }
}
