import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';

const STORAGE_CAT = 'key_cat';
const STORAGE_ID_CAT = 'key_id_cat';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private sortByName(cats: Category[]): Category[] {
    return cats.sort((a, b) =>
      a.categoryName.toLowerCase().localeCompare(b.categoryName.toLowerCase())
    );
  }

  genNewId(): number {
    const raw = localStorage.getItem(STORAGE_ID_CAT);
    let newId = raw ? Number(raw) : 1;
    if (!Number.isFinite(newId) || newId < 0) newId = 0;
    localStorage.setItem(STORAGE_ID_CAT, String(newId + 1));
    return newId;
  }

  load(type: boolean): Category[] {
    const json = localStorage.getItem(STORAGE_CAT);
    if (!json) return [];
    try {
      let cats = JSON.parse(json) as Category[];
      cats = cats.filter(cat => cat.isDeleted === type);
      return this.sortByName(cats);
    } catch {
      return [];
    }
  }

  loadFull(): Category[] {
    const json = localStorage.getItem(STORAGE_CAT);
    if (!json) return [];
    try {
      let cats = JSON.parse(json) as Category[];
      return this.sortByName(cats);
    } catch {
      return [];
    }
  }

  loadCat(currentCatId: number): any {
    let taskList = this.loadFull();
    const task = taskList.find(t => t.categoryId === currentCatId);
    return task;
  }

  add(newCatName: string) {
    const newTaskId = this.genNewId();
    let catList = this.loadFull();

    const newCat = new Category(
      newTaskId,
      newCatName,
    );

    catList.push(newCat);

    catList = this.sortByName(catList);

    localStorage.setItem(STORAGE_CAT, JSON.stringify(catList));
  }

  delete(currentCatId?: number) {
    let catList = this.loadFull();
    const index = catList.findIndex(t => t.categoryId === currentCatId);
    if (index > -1) {
      catList[index].isDeleted = true;
      localStorage.setItem(STORAGE_CAT, JSON.stringify(catList));
    }
  }

  update(updatedCat: Category): void {
    let catList = this.loadFull();
    const index = catList.findIndex(t => t.categoryId === updatedCat.categoryId);
    if (index > -1) {
      catList[index] = updatedCat;
      catList = this.sortByName(catList);

      localStorage.setItem(STORAGE_CAT, JSON.stringify(catList));
    }
  }

  restore(currentCatId?: number) {
    let catList = this.loadFull();
    const index = catList.findIndex(t => t.categoryId === currentCatId);
    if (index > -1) {
      catList[index].isDeleted = false;
      catList = this.sortByName(catList);
      localStorage.setItem(STORAGE_CAT, JSON.stringify(catList));
    }
  }

  searchAndFilter(curUrl?: string, searchString?: string): Category[] {
    let taskList: Category[];
    if (curUrl?.includes('/deletedTaskGroupsPage')) taskList = this.load(true);
    else taskList = this.load(false);

    if (searchString) {
      const lowerCaseSearchTerm = searchString.toLowerCase().trim();
      taskList = taskList.filter(task =>
        task.categoryName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return this.sortByName(taskList);
  }
}
