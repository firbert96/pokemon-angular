// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SearchTypeComponent } from './search-type.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { CapitalizePipe } from '../../pipes/capitalize.pipe';
// import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api.service';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';

// describe('SearchTypeComponent', () => {
//   let component: SearchTypeComponent;
//   let fixture: ComponentFixture<SearchTypeComponent>;
//   let mockApiService: jasmine.SpyObj<ApiService>;

//   beforeEach(async () => {
//     // Create a mock ApiService
//     mockApiService = jasmine.createSpyObj('ApiService', ['getData']);
//     mockApiService.getData.and.returnValue(of({ results: {
//       "count": 1302,
//       "next": "https://pokeapi.co/api/v2/pokemon?offset=1&limit=1",
//       "previous": null,
//       "results": [
//         {
//           "name": "bulbasaur",
//           "url": "https://pokeapi.co/api/v2/pokemon/1/"
//         }
//       ]
//     } }));

//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatAutocompleteModule,
//         CapitalizePipe,
//         SearchTypeComponent // Import the standalone component here
//       ],
//       providers: [
//         { provide: ApiService, useValue: mockApiService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SearchTypeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Trigger initial data binding
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getTypes on ngOnInit', () => {
//     spyOn(component, 'getTypes').and.callThrough();
//     component.ngOnInit();
//     expect(component.getTypes).toHaveBeenCalled();
//   });

//   it('should populate types with placeholder and fetched data', () => {
//     component.ngOnInit(); // Trigger ngOnInit to populate types
//     fixture.detectChanges();
//     expect(component.types).toContain('All Types');
//     expect(component.types).toContain('normal');
//   });

//   it('should emit typeValue when form control value changes', () => {
//     spyOn(component.typeValue, 'emit');
//     component.type.setValue('New Type');
//     fixture.detectChanges();
//     expect(component.typeValue.emit).toHaveBeenCalledWith('New Type');
//   });

//   it('should have mat-autocomplete in the form', () => {
//     const autocomplete = fixture.debugElement.query(By.css('mat-autocomplete'));
//     expect(autocomplete).toBeTruthy();
//   });

//   it('should have loader-container class applied', () => {
//     const formField = fixture.debugElement.query(By.css('mat-form-field'));
//     expect(formField).toBeTruthy();
//   });
// });
