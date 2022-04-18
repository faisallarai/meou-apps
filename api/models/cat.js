const mongoose = require('mongoose');

const catSchema = new mongoose.Schema(
  {
    imageId: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

catSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Cat', catSchema);
