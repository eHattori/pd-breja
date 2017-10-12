import mongoose from 'mongoose';

export default class PdvSchema {
  getSchema () {
    const schema = new mongoose.Schema({
      id: { $type: String, required: true },
      tradingName: {
        $type: String,
        required: [true, 'PDV tradingName is required']
      },
      ownerName: {
        $type: String,
        required: [true, 'PDV ownerName is required']
      },
      document: {
        $type: String,
        unique: true,
        validate: {
          validator: function (v) {
            return (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-d{2}$/.test(v) || /^\d{11}$/.test(v));
          },
          message: '{VALUE} is not a valid document'
        },
        required: [true, 'PDV document is required']
      },
      coverageArea: {
        $type: Object,
        type: String,
        coordinates: [[[[Number]]]],
        required: [true, 'PDV coverageArea is required']
      },
      address: {
        $type: Object,
        type: String,
        coordinates: [Number],
        required: [true, 'PDV coverageArea is required']
      }
    }, { typeKey: '$type' });

    return schema;
  }
}
