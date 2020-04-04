import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliveriesDeliverymanController {
  async deliveries(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id, canceled_at: null, end_date: null },
      order: ['id'],
      attributes: ['id', 'product'],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'No delivery found' });
    }

    return res.json(deliveries);
  }

  async delivered(req, res) {
    const { id } = req.params;

    const deliverymanExists = await Deliveryman.findByPk(id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id, end_date: { [Op.not]: null } },
      order: ['id'],
      attributes: ['id', 'product', 'end_date'],
    });

    if (!deliveries) {
      return res.status(400).json({ error: 'No delivery found' });
    }

    return res.json(deliveries);
  }
}

export default new DeliveriesDeliverymanController();
