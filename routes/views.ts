import * as express from 'express';


const router = express.Router();


router.get('/', (req, res) => {
    res.render('mainPage');
});

router.get("/user/:id", (req, res) =>{
    res.render('userPage');
})

export default router;