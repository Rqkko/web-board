import express from 'express';

const router = express.Router();

router.get('/getName', (req, res) => {
  res.json({ message: "Rakko"});
});

// router.post('/createAccount', (req, res) => {
//   // TODO
// });

export default router;
