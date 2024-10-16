const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
