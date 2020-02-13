import Courier from '../models/Courier';

class CourierController {
  async index(req, res) {
    const courier = await Courier.findAll();

    res.json(courier);
  }
}

export default new CourierController();
