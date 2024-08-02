import { TestBed } from '@angular/core/testing';
import { GeneralService } from './general.service'; // Adjust path as needed
import { ListDataFilter } from '../interfaces/api'; // Adjust path as needed

describe('GeneralService', () => {
  let service: GeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralService]
    });

    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setListDataFilter', () => {
    it('should add a new item to the listDataFilter', () => {
      const newItem: ListDataFilter = { name:'bulbasaur', url: 'test-url', types: '', favorite: false };

      service.setListDataFilter(newItem);
      service.listDataFilter$.subscribe(data => {
        expect(data).toContain(newItem);
      });
    });
  });

  describe('setTypesStr', () => {
    it('should update the types string for the given URL', () => {
      const initialItem: ListDataFilter = { name:'bulbasaur', url: 'test-url', types: '', favorite: false };
      service.setListDataFilter(initialItem);

      service.setTypesStr('test-url', 'new-types');
      service.listDataFilter$.subscribe(data => {
        const updatedItem = data.find(item => item.url === 'test-url');
        expect(updatedItem?.types).toBe('new-types');
      });
    });
  });

  describe('setFavoritesFlag', () => {
    it('should add URL to favorites when flag is true', () => {
      const url = 'test-url';
      const initialItem: ListDataFilter = { name:'bulbasaur', url, types: '', favorite: false };
      service.setListDataFilter(initialItem);

      service.setFavoritesFlag(url, true);
      service.favorite$.subscribe(favorites => {
        expect(favorites).toContain(url);
      });

      service.listDataFilter$.subscribe(list => {
        const item = list.find(i => i.url === url);
        expect(item?.favorite).toBe(true);
      });
    });

    it('should remove URL from favorites when flag is false', () => {
      const url = 'test-url';
      const initialItem: ListDataFilter = { name:'bulbasaur', url, types: '', favorite: true };
      service.setListDataFilter(initialItem);

      service.setFavoritesFlag(url, false);
      service.favorite$.subscribe(favorites => {
        expect(favorites).not.toContain(url);
      });

      service.listDataFilter$.subscribe(list => {
        const item = list.find(i => i.url === url);
        expect(item?.favorite).toBe(false);
      });
    });
  });
});
