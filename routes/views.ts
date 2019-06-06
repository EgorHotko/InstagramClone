import * as express from 'express';


const router = express.Router();


router.get('/', (req, res) => {
    res.render('mainPage');
});

router.get("/user/:id", (req, res) =>{
    res.render('userPage');
});

router.get('/post/:id', (req, res) => {
    res.render('postPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
})

export default router;