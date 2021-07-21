const handler = (req, res) => {
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
            res.status(201).json({
                message: 'Successfully Registered',
                id: new Date().toISOString(),
                email,
                name,
                comment: text
            });
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
