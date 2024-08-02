import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API list data', () => {
    const params = '/pokemon?limit=1&offset=0';
    const expectedUrl = `${service.url}${params}`; // Full URL constructed in the test
    const mockData = {
      "count": 1302,
      "next": "https://pokeapi.co/api/v2/pokemon?offset=1&limit=1",
      "previous": null,
      "results": [
        {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
        }
      ]
    };

    service.getData(params).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Respond with mock data
  });

  it('should handle errors API list data', () => {
    const params = '/pokemon?limit=1&offset=0';
    const url = `${service.url}${params}`;
    const errorMessage = 'Something went wrong';

    service.getData(params).subscribe(
      () => fail('expected an error, not data'),
      error => {
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(url);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should call the API list types', () => {
    const params = 'type';
    const expectedUrl = `${service.url}${params}`; // Full URL constructed in the test
    const mockData = {
      "count": 21,
      "next": "https://pokeapi.co/api/v2/type?offset=20&limit=1",
      "previous": null,
      "results": [
        {
          "name": "normal",
          "url": "https://pokeapi.co/api/v2/type/1/"
        },
        {
          "name": "fighting",
          "url": "https://pokeapi.co/api/v2/type/2/"
        },
        {
          "name": "flying",
          "url": "https://pokeapi.co/api/v2/type/3/"
        },
        {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        },
        {
          "name": "ground",
          "url": "https://pokeapi.co/api/v2/type/5/"
        },
        {
          "name": "rock",
          "url": "https://pokeapi.co/api/v2/type/6/"
        },
        {
          "name": "bug",
          "url": "https://pokeapi.co/api/v2/type/7/"
        },
        {
          "name": "ghost",
          "url": "https://pokeapi.co/api/v2/type/8/"
        },
        {
          "name": "steel",
          "url": "https://pokeapi.co/api/v2/type/9/"
        },
        {
          "name": "fire",
          "url": "https://pokeapi.co/api/v2/type/10/"
        },
        {
          "name": "water",
          "url": "https://pokeapi.co/api/v2/type/11/"
        },
        {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        },
        {
          "name": "electric",
          "url": "https://pokeapi.co/api/v2/type/13/"
        },
        {
          "name": "psychic",
          "url": "https://pokeapi.co/api/v2/type/14/"
        },
        {
          "name": "ice",
          "url": "https://pokeapi.co/api/v2/type/15/"
        },
        {
          "name": "dragon",
          "url": "https://pokeapi.co/api/v2/type/16/"
        },
        {
          "name": "dark",
          "url": "https://pokeapi.co/api/v2/type/17/"
        },
        {
          "name": "fairy",
          "url": "https://pokeapi.co/api/v2/type/18/"
        },
        {
          "name": "stellar",
          "url": "https://pokeapi.co/api/v2/type/19/"
        },
        {
          "name": "unknown",
          "url": "https://pokeapi.co/api/v2/type/10001/"
        }
      ]
    };

    service.getData(params).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Respond with mock data
  });

  it('should handle errors API list types', () => {
    const params = '/pokemon?limit=1&offset=0';
    const url = `${service.url}${params}`;
    const errorMessage = 'Something went wrong';

    service.getData(params).subscribe(
      () => fail('expected an error, not data'),
      error => {
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(url);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
