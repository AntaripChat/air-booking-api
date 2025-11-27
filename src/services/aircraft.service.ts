import { Aircraft, IAircraft } from "../model/aircraft.model";

class AircraftService {
  async createAircraft(data: Partial<IAircraft>): Promise<IAircraft> {
    const aircraft = new Aircraft(data);
    return await aircraft.save();
  }

  async getAllAircrafts(): Promise<IAircraft[]> {
    return await Aircraft.find();
  }

  async getAircraftById(id: string) {
    return await Aircraft.findById(id);
  }
}

export default new AircraftService();
