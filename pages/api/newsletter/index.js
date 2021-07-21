const handler = (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;
        res.status(201).json({message: 'Successfully Registered', email});
    } else {
        res.status(200);
    }

};

export default handler;
