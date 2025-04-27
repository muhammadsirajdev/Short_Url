const{nanoid}=require('nanoid')

const URL = require('../models/url')

async function handlegenerateShortUrl(req, res) {
    try {
        const shortID= nanoid(8)
        const body = req.body
        if (!body.url) {
            return res.status(400).json({ error: 'Url is required' });
        }

        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });
        return res.status(201).json({id:shortID})
    } catch (error) {
        return res.status(500).json({ error: 'Error creating short URL' });
    }
}

async function handleRedirect(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: { 
                    visitHistory: { 
                        timestamp: Date.now() 
                    } 
                } 
            },
            { new: true }
        );
        
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        
        return res.redirect(entry.redirectUrl);
    } catch (error) {
        return res.status(500).json({ error: 'Error redirecting to URL' });
    }
}

module.exports={
    handlegenerateShortUrl,
    handleRedirect
}