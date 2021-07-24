import {MongoClient} from "mongodb";

import {connectDatabase, insertDocument} from '../../../helpers/db-util';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({message: 'Connecting to database failed'});
            return;
        }

        try {
            await insertDocument(client, 'newsletter', email);
            await client.close();
        } catch (error) {
            res.status(500).json({message: 'Inserting data failed!'});
            return;
        }

        res.status(201).json({message: 'Successfully Registered', email});
    } else {
        res.status(200);
    }


};

export default handler;
