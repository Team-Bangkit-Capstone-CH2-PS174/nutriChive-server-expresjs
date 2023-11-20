var express = require('express');
var router = express.Router();

const { listNote,createNote,deleteNote,updateNote,listNoteDetail } = require('./controller');
/* GET home page. */
router.get('/', listNote);
router.get('/detail/:id', listNoteDetail);
router.post('/create', createNote);
router.delete('/delete/:id', deleteNote);
router.put('/edit/:id', updateNote);
module.exports = router;
