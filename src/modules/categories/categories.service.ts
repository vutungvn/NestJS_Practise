import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  findCategories() {
    return [
      {
        id: 1,
        name: 'Máy bay',
      },
    ];
  }
}
