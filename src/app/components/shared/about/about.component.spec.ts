import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('Components::AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AboutComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AboutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create About page', () => {
    expect(component).toBeTruthy();
  });
  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  // it(
  //   'should render title in a h1 tag',
  //   async(() => {
  //     fixture.detectChanges();
  //     const compiled = fixture.debugElement.nativeElement;
  //     expect(compiled.querySelector('h1').textContent);
  //     //   .toContain('About Works!',);
  //   }),
  // );
});
