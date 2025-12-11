export class Category {
    categoryId: number;
    categoryName: string;
    createAt : Date;
    isDeleted? : boolean;
    constructor(newCategoryId: number, newCategoryName: string) {
        this.categoryId = newCategoryId;
        this.categoryName = newCategoryName;
        this.createAt = new Date();
        this.isDeleted = false;
    }
}