import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AllComponent } from '../all/all.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        AllComponent,         // Declare AllComponent
        FavoritesComponent   // Declare FavoritesComponent
      ],
      imports: [
        MatTabsModule // Import MatTabsModule
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements like <app-all> and <app-favorites>
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tab labels', () => {
    const tabLabels = fixture.nativeElement.querySelectorAll('mat-tab');
    expect(tabLabels.length).toBe(2); // Expect 2 tabs

    expect(tabLabels[0].textContent).toContain('All');
    expect(tabLabels[1].textContent).toContain('Favorites');
  });

  it('should render the All component in the first tab', () => {
    const allComponent = fixture.nativeElement.querySelector('app-all');
    expect(allComponent).toBeTruthy();
  });

  it('should render the Favorites component in the second tab', () => {
    const favoritesComponent = fixture.nativeElement.querySelector('app-favorites');
    expect(favoritesComponent).toBeTruthy();
  });
});
