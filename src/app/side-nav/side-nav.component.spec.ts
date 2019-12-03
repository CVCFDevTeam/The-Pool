import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';

// @ts-ignore
describe('SideNavComponent', () => {
    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;

    // @ts-ignore
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavComponent]
        })
            .compileComponents();
    }));

    // @ts-ignore
    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // @ts-ignore
    it('should create', () => {
        // @ts-ignore
        expect(component).toBeTruthy();
    });
});
