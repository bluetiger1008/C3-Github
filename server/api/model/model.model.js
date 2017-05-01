'use strict';

import mongoose, {Schema} from 'mongoose';

var ModelSchema = new mongoose.Schema({
  owner: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  modelYear: String,
  makeType: String,
  modelType: String,
  data: {
  	name: String,
  	description: String,
  	image: String,
  	video: String,
  }
});

export default mongoose.model('Model', ModelSchema);
