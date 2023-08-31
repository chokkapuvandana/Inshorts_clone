import mongoose from "mongoose";

const Connection = async (username, password) => {
  console.log("lets see");
  try {
    console.log("lets seeeeee");
    // const URL = `mongodb://${username}:${password}@clone-inshort-shard-00-00.deivq.mongodb.net:27017,clone-inshort-shard-00-01.deivq.mongodb.net:27017,clone-inshort-shard-00-02.deivq.mongodb.net:27017/INSHORTS-CLONE?ssl=true&replicaSet=atlas-ytsxi5-shard-0&authSource=admin&retryWrites=true&w=majority`;
    const URL = `mongodb+srv://${username}:${password}@cluster0.l39rvd5.mongodb.net/`;
    await mongoose.connect(URL, { useNewUrlParser: true });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error);
  }
};

export default Connection;
