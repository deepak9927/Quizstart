// controllers/contactController.js
const Contact = require('../models/contact');
const emailService = require('../service/emailService');

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    
    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      message,
      subject: subject || 'General Inquiry'
    });
    
    // Save to database
    await newContact.save();
    
    // Send notification to admin
    try {
      if (process.env.NODE_ENV === 'development') {
        await emailService.sendTestEmail(
          process.env.ADMIN_EMAIL || 'deepak27kumarthakur@gmail.com',
          `New Contact Form Submission: ${subject || 'General Inquiry'}`,
          `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        );
      } else if (process.env.EMAIL_USER) {
        await emailService.sendNotification(
          process.env.ADMIN_EMAIL,
          `New Contact Form Submission: ${subject || 'General Inquiry'}`,
          `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        );
      }
    } catch (emailErr) {
      console.error('Failed to send contact notification email:', emailErr);
      // Continue with the response even if email fails
    }
    
    // Send confirmation to user if they provided an email
    try {
      if (email && process.env.EMAIL_USER && process.env.NODE_ENV !== 'development') {
        await emailService.sendNotification(
          email,
          'Thank you for contacting us',
          `Dear ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nRegards,\nThe Quiz App Team`
        );
      }
    } catch (confirmErr) {
      console.error('Failed to send confirmation email:', confirmErr);
      // Continue with the response even if confirmation email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Contact message received successfully',
      data: newContact
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to submit contact message',
      error: err.message
    });
  }
};

// Get all contact messages (for admin)
exports.getAllContacts = async (req, res) => {
  try {
    // In a production app, you would add authentication here
    // to ensure only admins can access this endpoint
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Get contact by ID (for admin)
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Update status to 'read' if it was 'unread'
    if (contact.status === 'unread') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Update contact status (for admin)
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['unread', 'read', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Delete contact (for admin)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    await contact.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};