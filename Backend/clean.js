const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://training:shangan@fullstack-training.gw3nkbl.mongodb.net/demoDec?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    for (let collection of collections) {
      console.log(`Dropping: ${collection.name}`);
      await db.collection(collection.name).deleteMany({});
    }

    console.log("All collections cleared.");
    process.exit();
  })
  .catch(err => {
    console.error("Error dropping database:", err);
    process.exit(1);
  });
