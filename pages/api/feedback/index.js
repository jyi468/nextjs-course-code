import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

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
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: 'Success!', feedback: newFeedback});
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({feedback: data});
    }
}

export default handler;
