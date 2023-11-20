const Note = require('./model')
const bcrypt = require('bcryptjs')
module.exports = {
    listNote: async (req, res) => {
      
        try {
           
            const note = await Note.find().select('_id title content');
            res.status(200).json({data:note});

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
        }
    },
    createNote: async (req, res) => {
        console.log('body',req.body);
        try {
              const { title, content} = req.body; 
              const payload = {
                title,
                content
              }
              const note = new Note(payload)
              await note.save();
                res.status(200).json({ data: note });

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
        }
    },
    deleteNote: async (req, res) => {
        try {
            const { id } = req.params;
            const note = await Note.findByIdAndRemove({ _id: id });
            res.status(200).json({ data: note });

            
        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'});
        }
    },
    listNoteDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const note = await Note.findById({ _id: id });
            res.status(200).json(note);

            
        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'});
        }
    },
    
    updateNote: async(req,res)=>{
        try {
            const { id } = req.params;
            const { title,content } = req.body;
            await Note.findByIdAndUpdate({ _id: id }, {
                title,
                content
            });
            res.status(200).json({ status:"success" });
        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'});
        }
    }
   
}
