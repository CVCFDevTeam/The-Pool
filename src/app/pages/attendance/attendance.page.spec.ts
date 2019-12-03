import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePageComponent } from './attendance.page';


// @ts-ignore
describe('AttendanceComponent', () => {
    let component: AttendancePageComponent;
    let fixture: ComponentFixture<AttendancePageComponent>;

    // @ts-ignore
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AttendancePageComponent]
        })
            .compileComponents();
    }));

    // @ts-ignore
    beforeEach(() => {
        fixture = TestBed.createComponent(AttendancePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // @ts-ignore
    it('should create', () => {
        // @ts-ignore
        expect(component).toBeTruthy();
    });
});
