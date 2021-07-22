import {MongoClient} from "mongodb";

const handler = async (req, res) => {
    const eventId = req.query.eventId;
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

            const client = await MongoClient.connect(
                'mongodb+srv://josh:ggzzmjkOe6CWHpMo@cluster0.ajkwa.mongodb.net/events?retryWrites=true&w=majority'
            );

            const newComment = {
                eventId,
                email,
                name,
                text
            };

            const db = client.db();
            const result = await db.collection('comments').insertOne(newComment);

            console.log(result);

            newComment.id = result.insertedId;

            res.status(201).json(newComment);

            await client.close();
            break;
        case 'GET':
        default:
            const comments = [
                {id: '1', name: 'josh', comment: 'hello'},
                {id: '2', name: 'josh', comment: 'hello2'},
                {id: '3', name: 'josh', comment: 'hello3'}
            ]
            res.status(200).json({comments});
    }
};

export default handler;
