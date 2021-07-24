import {MongoClient} from "mongodb";

import {connectDatabase, insertDocument, getAllDocuments} from "../../../helpers/db-util";

const handler = async (req, res) => {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({message: 'Connecting to database failed'});
        return;
    }

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

            let result;

            try {
                result = await insertDocument(client, 'comments', newComment);
                newComment._id = result.insertedId;
                res.status(201).json(newComment);
            } catch (error) {
                res.status(500).json({message: 'Inserting comment failed'});
                return;
            }
            break;
        case 'GET':
            try {
                // Return all comments if using .find with no args
                const documents = await getAllDocuments(client, 'comments', {_id: -1}, {eventId});
                res.status(200).json({comments: documents});
            } catch (error) {
                res.status(500).json({message: 'Getting comments failed.'});
            }
            break;
        default:
            break;
    }

    await client.close();
};

export default handler;
