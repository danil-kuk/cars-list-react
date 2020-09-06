import { SortOrder } from 'src/types';
import { DatabaseKeys } from 'src/constants';
import { User } from 'src/models';

import { UserDto } from '../dtos';
import { userMapper } from '../mappers';

import databaseService from './database-service';

/**
 * User service.
 */
class UserService {
  /**
   * Get all users from database.
   * @param callback React state update callback.
   * @param field Filed to sort data by.
   * @param sortOrder Data sort order.
   */
  getAllUsers(
    callback: (value: React.SetStateAction<User[]>) => void,
    field?: string,
    sortOrder?: SortOrder,
  ): () => void {
    if (field && sortOrder) {
      return databaseService
        .getAllItemsSorted(DatabaseKeys.USERS_COLLECTION_ID, field, sortOrder)
        .onSnapshot((data) => {
          callback(this.mapUsersData(data));
        });
    } else {
      return databaseService.getAllItems(DatabaseKeys.USERS_COLLECTION_ID).onSnapshot((data) => {
        callback(this.mapUsersData(data));
      });
    }
  }

  /**
   * Map raw users data to User objects.
   * @param data Raw users data.
   */
  mapUsersData(data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>): User[] {
    return data.docs.map((doc) => doc.data() as UserDto).map((dto) => userMapper.fromDto(dto));
  }

  /**
   * Create/update user in database.
   * @param dto User dto.
   */
  saveUserToDatabase(user: User): void {
    const dto = userMapper.toDto(user);

    if (dto.id) {
      databaseService.updateItem(DatabaseKeys.USERS_COLLECTION_ID, dto);
    } else {
      databaseService.postItem(DatabaseKeys.USERS_COLLECTION_ID, dto);
    }
  }

  /**
   * Delete user from database.
   * @param user User to delete.
   */
  delteUserFromDatabase(user: User): void {
    databaseService.deleteItem(DatabaseKeys.USERS_COLLECTION_ID, user.id);
  }

  /**
   * Check user credentials and login.
   * @param email User email.
   * @param password User password.
   */
  async login(email: string, password: string): Promise<User | null> {
    const items = await databaseService.getItemsByField(DatabaseKeys.USERS_COLLECTION_ID, 'email', email);
    const userDto = items[0] as UserDto;

    if (userDto && userDto.password === password) {
      return userMapper.fromDto(userDto);
    }
    return null;
  }
}

export default new UserService();
