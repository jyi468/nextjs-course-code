import {MongoClient} from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        const client = await MongoClient.connect(
            'mongodb+srv://josh:ggzzmjkOe6CWHpMo@cluster0.ajkwa.mongodb.net/events?retryWrites=true&w=majority'
        )
        const db = client.db();

        await db.collection('emails').insertOne({email: email});

        await client.close();

        res.status(201).json({message: 'Successfully Registered', email});
    } else {
        res.status(200);
    }


};

export default handler;
