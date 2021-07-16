import fs from 'fs';
import path from 'path';

function handler(req, res) {
    if (req.method === 'POST') {
        // req.body is already parsed by nextjs for us
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }

        // store object in a DB or a file
        const filePath = path.join(process.cwd(), 'data', 'feedback.json');
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'Success!', feedback: newFeedback});
    } else {
        res.status(200).json({message: 'This works!'});
    }
}

export default handler;
