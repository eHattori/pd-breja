
export default class PdvRoutes {
  constructor (express) {
    this.express = express;
  }

  getApp () {
    var app = this.express();

    app.post('', (req, res) => {
            // To-DO post
    });

    app.get(':id', (req, res) => {
            // To-DO get by :id
    });

    app.get('', (req, res) => {
            // To-DO by lng, lat
    });

    return app;
  }
}
