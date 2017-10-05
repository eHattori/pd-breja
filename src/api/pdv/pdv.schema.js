export default class PdvSchema {
  getSchema () {
    const schema = {
      id: String,
      tradingName: String,
      ownerName: String,
      document: String,
      coverageArea: {
        type: [Number],
        index: '2dsphere'
      },
      address: {
        type: [Number],
        index: '2dsphere'
      }
    };

    return schema;
  }
}
