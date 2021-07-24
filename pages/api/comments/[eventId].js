import {MongoClient} from "mongodb";

const handler = async (req, res) => {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect(
        'mongodb+srv://josh:ggzzmjkOe6CWHpMo@cluster0.ajkwa.mongodb.net/events?retryWrites=true&w=majority'
    );
    const db = client.db();

    switch (req.method) {
        case 'POST':
            // Server-side validation
            const {email, name, text} = req.body;
            if (!email.includes('@') ||
                !name ||
                !text) {
                res.status(422).json({message: 'Invalid input.'});
                break;
            }

            const newComment = {
                eventId,
                email,
                name,
                text
            };

            const result = await db.collection('comments').insertOne(newComment);

            console.log(result);

            newComment.id = result.insertedId;

            res.status(201).json(newComment);

            break;
        case 'GET':
            // Return all comments if using .find with no args
            const documents = await db
                .collection('comments')
                .find({eventId})
                .sort({_id: -1})
                .toArray();
            res.status(200).json({comments: documents});
            break;
        default:
            break;
    }

    await client.close();
};

export default handler;
