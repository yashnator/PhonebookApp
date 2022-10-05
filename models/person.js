const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

console.log('connecting to ', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(err => {
        console.log('error connecting to MongoDB: ', err.message)
    })

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: Number,
        required: true,
        validate:{
            validator:function(val){
                const check1 = val.length>8;
                const a = val.split("-")
                if(a.length===1){
                    return check1
                } else if(a.length===2){
                    const check2 = a[0].length===2 || a[0].length===3;
                    const check3 = (a[0].match(/^[0-9]+$/) != null) && (a[1].match(/^[0-9]+$/) != null)
                    return (check1 && check2 && check3)
                } else{
                    return false
                }
            },
            message: 'Invalid number'
        }
    }
})

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', PersonSchema)