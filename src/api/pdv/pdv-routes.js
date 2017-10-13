import PdvController from './pdv-controller';


export default class PdvRoutes {
  constructor (express, controller) {
    this.express = express;
    this._controller = !controller ? new PdvController() : controller;    
  }

  getApp () {
    var app = this.express();

    app.post('', (req, res) => {
            // To-DO post
    });

    app.get('/:id', (req, res) => {
      this._controller.getById(req.params.id, function(result){
        try {
            var status =  result.pdvs.length > 0 ? 200 : (result.error ? 400 : 404); 
            res.status(status).json(result);
        } catch(error){
          res.status(500).json(error);
        }        
      });
    });

    app.post('/', (req, res) => {
        console.log("XANA 2");
        res.status(404).json({status: 'Pdv not found!'});
    });

    return app;
  }
}
