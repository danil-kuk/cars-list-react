import 'firebase/firestore';

import firebase from 'firebase/app';
import { FirebaseConfig } from 'src/models/firebase-config';
import { SortOrder } from 'src/types';

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
};

/**
 * Cloud Firesote database service.
 */
class DatabaseService {
  private readonly database: firebase.firestore.Firestore;
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore();
  }

  /**
   * Perform GET request to database and get entries in collection.
   * @param collectionId Cloud Firestore collection id.
   */
  getAllItems(collectionId: string): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
    return this.database.collection(collectionId);
  }

  /**
   * Perform GET request to database and get entries in collection.
   * @param collectionId Cloud Firestore collection id.
   * @param field Field to order by.
   * @param sortOrder How to sort data ("asc" or "desc").
   */
  getAllItemsSorted(collectionId: string, field: string, sortOrder: SortOrder) {
    return this.getAllItems(collectionId).orderBy(field, sortOrder);
  }

  /**
   * Perform POST request to database that adds new item.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to add to database.
   */
  async postItem<T extends { id: string }>(collectionId: string, item: T): Promise<void>  {
    const newItemDocRef = this.database.collection(collectionId).doc();

    item.id = newItemDocRef.id;
    await newItemDocRef.set(item);
  }

  /**
   * Perform PATCH request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to update in database.
   */
  async updateItem<T extends { id: string }>(collectionId: string, item: T): Promise<void> {
    await this.database.collection(collectionId).doc(item.id).update(item);
  }

  /**
   * Perform DELETE request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param itemId Id of item to delete.
   */
  async deleteItem(collectionId: string, itemId: string): Promise<void> {
    await this.database.collection(collectionId).doc(itemId).delete();
  }

  /**
   * Search all items where passed field value in database equal to passed value.
   * @param collectionId Cloud Firestore collection id.
   * @param field Field to search by.
   * @param value Value to search by.
   */
  async getItemsByField(
    collectionId: string,
    field: string,
    value: string,
  ): Promise<firebase.firestore.DocumentData[]> {
    const dbResponse = await this.database.collection(collectionId).where(field, '==', value).get();
    const items = dbResponse.docs.map((doc) => doc.data());

    return items;
  }
}

export default new DatabaseService();
