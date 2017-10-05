import Joi from 'joi';

export default class PdvSchema {
  getSchema () {
    var mongoose = require('mongoose');
    var Joigoose = require('joigoose')(mongoose);

    const schema = Joi.object().keys({
      id: Joi.string(),
      tradingName: Joi.string().min(3).max(50).required(),
      ownerName: Joi.string().min(3).max(50).required(),
      document: Joi.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
      coverageArea: Joi.any().required(),
      address: Joi.any().required()
    });

    var mongooseUserSchema = Joigoose.convert(schema);

    mongooseUserSchema.coverageArea = mongoose.Schema.Types.MultiPolygon;
    mongooseUserSchema.address = mongoose.Schema.Types.Point;

    return mongooseUserSchema;
  }
}
