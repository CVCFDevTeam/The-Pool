import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';


// @ts-ignore
describe('AppComponent', () => {
    // @ts-ignore
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));
    // @ts-ignore
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        // @ts-ignore
        expect(app).toBeTruthy();
    }));
    // @ts-ignore
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        // @ts-ignore
        expect(app.title).toEqual('app');
    }));
    // @ts-ignore
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        // @ts-ignore
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to the-pool!');
    }));
});
