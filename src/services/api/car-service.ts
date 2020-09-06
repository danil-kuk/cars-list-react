import { SortOrder } from 'src/types';
import { DatabaseKeys } from 'src/constants';
import { Car } from 'src/models';
import { dateToString } from 'src/utils';

import { CarDto } from '../dtos';
import { carMapper } from '../mappers';

import databaseService from './database-service';

/**
 * Car service.
 */
class CarService {
  /**
   * Get all cars from database.
   * @param callback React state update callback.
   * @param field Filed to sort data by.
   * @param sortOrder Data sort order.
   */
  getAllCars(callback: (value: React.SetStateAction<Car[]>) => void, field?: string, sortOrder?: SortOrder): () => void {
    if (field && sortOrder) {
      return databaseService.getAllItemsSorted(DatabaseKeys.CARS_COLLECTION_ID, field, sortOrder).onSnapshot((data) => {
        callback(this.mapCarsData(data));
      });
    } else {
      return databaseService.getAllItems(DatabaseKeys.CARS_COLLECTION_ID).onSnapshot((data) => {
        callback(this.mapCarsData(data));
      });
    }
  }

  /**
   * Map raw cars data to Car objects.
   * @param data Raw cars data.
   */
  mapCarsData(data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>): Car[] {
    return data.docs.map((doc) => doc.data() as CarDto).map((dto) => carMapper.fromDto(dto));
  }

  /**
   * Create/update car in database.
   * @param dto Car dto.
   */
  saveCarToDatabase(dto: CarDto): void {
    const updated = dateToString(new Date());

    if (dto.id) {
      databaseService.updateItem(DatabaseKeys.CARS_COLLECTION_ID, {
        ...dto,
        updated,
      });
    } else {
      const created = dateToString(new Date());

      databaseService.postItem(DatabaseKeys.CARS_COLLECTION_ID, {
        ...dto,
        created,
        updated,
      });
    }
  }

  /**
   * Delete car from database.
   * @param car Car to delete.
   */
  delteCarFromDatabase(car: Car): void {
    databaseService.deleteItem(DatabaseKeys.CARS_COLLECTION_ID, car.id);
  }
}
export default new CarService();
