const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: "Lab 3 setup works!" });
});

app.get('/visit-count', (req, res) => {
    const previous = Number.parseInt(req.cookies.visits, 10);
    const visits = Number.isNaN(previous) ? 1 : previous + 1;

    res.cookie('visits', String(visits), {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ visits });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
