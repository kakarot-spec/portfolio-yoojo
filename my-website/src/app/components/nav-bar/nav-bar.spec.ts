import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './nav-bar';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit scroll direction on arrow click', async () => {
    const emitPromise = firstValueFrom(component.scrollDirection);

    component.onScroll('down');

    const direction = await emitPromise;
    expect(direction).toBe('down');
  });
});
