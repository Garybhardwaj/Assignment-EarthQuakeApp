import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppModule} from './app.module'
import {DashboardComponent} from './dashboard/dashboard.component'
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AppModule]
    }).compileComponents();
  }));
// To test the AppComponent creates the app
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
// To test the title of page equals to earthquakeapp
  it(`should have as title 'earthquakeapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('earthquakeapp');
  });
// To check the title of app be rendered in h1 tag 
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Earthquakes');
  });
});
