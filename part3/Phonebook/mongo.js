const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as an argument')
  process.exit(1)
}

const url = 'mongodb+srv://boylek42:pe5yuk4m2g96j9@phonebook.zrqmhxt.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactName = process.argv[3]
const contactNumber = process.argv[4]

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: contactName,
  number: contactNumber,
})

// contact.save().then(result => {
//     console.log(`Added ${result.name}!`)
//     mongoose.connection.close()
// })

Contact.find({}).then(result => {
  console.log('\nContacts:')
  let i = 1
  result.forEach(contact => {
    console.log(`${String(i)}. ${contact.name}: ${contact.number}`)
    i = i + 1
  })
  mongoose.connection.close()
})