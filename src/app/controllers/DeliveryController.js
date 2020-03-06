import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const delivery = await Delivery.findAll({
      order: ['product'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
    });

    res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const delivery = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    return res.json(delivery);
  }
}

export default DeliveryController();
