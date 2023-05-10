import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TablesService } from './tables.service';

describe('TablesService', () => {
  let service: TablesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TablesService]
    });
    service = TestBed.inject(TablesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve tables', () => {
    const mockTables = [
      { id: 1, name: 'Table 1' },
      { id: 2, name: 'Table 2' }
    ];

    service.getTables().subscribe(tables => {
      expect(tables).toEqual(mockTables);
    });

    const req = httpMock.expectOne('http://localhost:3000/tables');
    expect(req.request.method).toBe('GET');
    req.flush(mockTables);
  });

  it('should create a new table', () => {
    const newTable = { id: "table1", columns: [] };

    service.postTables(newTable).subscribe(response => {
      expect(response).toBe(newTable);
    });

    const req = httpMock.expectOne('http://localhost:3000/tables');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTable);
    req.flush(newTable);
  });

  it('should update a table', () => {
    const updatedTable = { id: "table1", columns: [] };

    service.UpdateTable('1', updatedTable).subscribe(response => {
      expect(response).toBe(updatedTable);
    });

    const req = httpMock.expectOne('http://localhost:3000/tables/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTable);
    req.flush(updatedTable);
  });

  it('should delete a table', () => {
    const tableId = '1';

    service.deleteTable(tableId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/tables/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
