import {MongoClient} from "mongodb";

export const connectDatabase = async () => {
    const client = await MongoClient.connect(
        'mongodb+srv://josh:ggzzmjkOe6CWHpMo@cluster0.ajkwa.mongodb.net/events?retryWrites=true&w=majority'
    );

    return client;
}

export const insertDocument = async (client, collection, document) => {
    const db = client.db();

    await db.collection(collection).insertOne({email: document});
}

export const getAllDocuments = async (client, collection, sort, filter={}) => {
    const db = client.db();

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort({_id: -1})
        .toArray();

    return documents;
}
