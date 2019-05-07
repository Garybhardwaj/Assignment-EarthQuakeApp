import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { LeafletModule, LeafletDirective, LeafletTileLayerDefinition, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
import { HttpClient, HttpHandler,HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [        
        LeafletModule.forRoot()
      ],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    
it('should call the method on clicking item from List of features', async(() => {
const fixture = TestBed.createComponent(DashboardComponent);
const app = fixture.debugElement.componentInstance;
spyOn(app, 'selectFeature');
app.selectFeature({place:'26km WNW of Noatak, Alaska',type:'earthquake',time:new Date(),magnitude:1.79,location:[33.9654999, -116.7024994]});
fixture.whenStable().then(() => {
expect(app.selectFeature).toHaveBeenCalled();
});
})); 
 
 

});
