import { StatusCodes } from 'http-status-codes';
import { DeliveryPartner } from '../models/DeliveryPartner';
import { HttpError } from '../utils/httpError';

export const deliveryService = {
  async toggleAvailability(partnerId: string, isOnline: boolean) {
    const partner = await DeliveryPartner.findById(partnerId);
    if (!partner) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Delivery partner not found');
    }
    partner.isOnline = isOnline;
    await partner.save();
    return partner;
  },

  async updateLocation(partnerId: string, location: { lat: number; lng: number }) {
    const partner = await DeliveryPartner.findById(partnerId);
    if (!partner) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Delivery partner not found');
    }
    partner.location = { ...location, updatedAt: new Date() };
    await partner.save();
    return partner;
  },

  async performanceSummary(partnerId: string) {
    const partner = await DeliveryPartner.findById(partnerId).lean();
    if (!partner) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Delivery partner not found');
    }
    return partner.stats;
  }
};


