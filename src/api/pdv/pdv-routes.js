import PdvController from './pdv-controller';


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
            res.status(404).json({status : "Pdv not found!"});
    });

    app.get('', (req, res) => {
            // To-DO by lng, lat
    });

    return app;
  }
}
