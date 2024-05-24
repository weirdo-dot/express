import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.status(403).send('Sorry, the application is only available during working hours.');
    }
};

// Apply the middleware globally
app.use(checkWorkingHours);
app.use(express.static(path.join(__dirname, 'public')));

const publicPath = path.join(__dirname, 'public');


// Routes
app.get('/', (req, res) => {
    res.sendFile(`${publicPath}/index.html`)
});

app.get('/services', (req, res) => {
    res.sendFile(`${publicPath}/services.html`)
});

app.get('/contact', (req, res) => {
    res.sendFile(`${publicPath}/contact.html`)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
