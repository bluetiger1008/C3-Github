'use strict';

import mongoose from 'mongoose';

var ModeltypeSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Modeltype', ModeltypeSchema);
