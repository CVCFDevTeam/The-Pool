import { Attendee } from '../models/attendee';

export class Constants {
    public static readonly USER_ATTENDEE: string =
        '<Attendees User ID from Firebase to check if user is logged in as an Attendee or other>';

    // Dropdown Values
    public static readonly SIZES: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
    public static readonly GENDERS: string[] = ['Male', 'Female'];
    public static readonly STATES: string[] = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
        'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI',
        'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV',
        'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
        'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    public static readonly CHURCH_LIST: string[] = [
        'Other', '<AZ - Church Name>',
        '<PA - Church Name>',
        '<PA - Church Name>',
        '<MN - Church Name>',
        '<OH - Church Name>',
        '<OH - Church Name>',
        '<NY - Church Name>',
        '<CA - Church Name>',
        '<VA - Church Name>',
        '<FL - Church Name>',
        '<KY - Church Name>',
        '<NC - Church Name>',
        'N/A'
    ];
    public static readonly ROLES: string[] = [
        'Attendee',
        'Leader',
        'Staff',
        'Board',
        'Worship Team',
        'Speaker',
        'Servant',
        'Adult',
        'Creative Art',
        'Security'
    ];
    public static readonly PAID_STATUS: string[] = [
        'Fully Paid',
        'Discounted Payment',
        'Still Needs To Pay'
    ];
    public static readonly GROUP_LEADERS: string[] = [
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>',
        '<Group Leader Name, Group Leader Name>'
    ];
    public static readonly DAYS_ATTENDING: string[] = ['Friday', ' Saturday', ' Sunday', ' Monday'];
    public static readonly ROOM_LOCATIONS: string[] = [
        'D1 - Dorm',
        'D2 - Dorm',
        'D3 - Dorm',
        'L1 - Lodge',
        'L2 - Lodge',
        'L3 - Lodge',
        'L4 - Lodge',
        'M1 - Motel',
        'M2 - Motel',
        'M3 - Motel',
        'M4 - Motel',
        'M5 - Motel',
        'M6 - Motel',
        'M7 - Motel',
        'M8 - Motel',
        'M9 - Motel',
        'M10 - Motel',
        'M11 - Motel',
        'M12 - Motel',
        'M13 - Motel',
        'M14 - Motel',
        'M15 - Motel',
        'M16 - Motel',
        'M17 - Motel',
        'M18 - Motel',
        'M19 - Motel',
        'M20 - Motel'
    ];
    public static readonly TEAMS: string[] = [
        '1 - Goodness',
        '2 - Knowledge',
        '3 - Self Control',
        '4 - Perseverance',
        '5 - Godliness',
        '6 - Mutual Affection',
        '7 - Love',
        '8 - Adult',
        '9 - Staff',
        '10 - Speakers',
        '11 - Worship Team',
        '12 - Creative Art',
        '13 - Servants',
        '14 - Security'
    ];

    public static readonly LEADERS: string[] = [
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>',
        '<Team Leader Name>'
    ];
    public static readonly COLEADERS: string[] = [
        '<Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>',
        'Team Co-Leader Name>'
    ];

    static mapAttendee(key: string, result: any): Attendee {
        const attendee = new Attendee();

        attendee.key = key;
        attendee.first_name = result.first_name;
        attendee.last_name = result.last_name;
        attendee.t_shirt = result.t_shirt;
        attendee.gender = result.gender;
        attendee.age = result.age;
        attendee.medical = result.medical;
        attendee.address = result.address;
        attendee.address_2 = result.address_2;
        attendee.city = result.city;
        attendee.state = result.state;
        attendee.zip_code = result.zip_code;
        attendee.email = result.email;
        attendee.emergency_contact_first_name = result.emergency_contact_first_name;
        attendee.emergency_contact_last_name = result.emergency_contact_last_name;
        attendee.emergency_contact_phone_number = result.emergency_contact_phone_number;
        attendee.emergency_contact_relationship = result.emergency_contact_relationship;
        attendee.your_church = result.your_church;
        attendee.your_church_point_of_contact_name = result.your_church_point_of_contact_name;
        attendee.your_church_point_of_contact_number = result.your_church_point_of_contact_number;
        attendee.days_attending = result.days_attending;
        attendee.cost = result.cost;
        attendee.checked_in = result.checked_in;
        attendee.paid_status = result.paid_status;
        attendee.room_location = result.room_location;
        attendee.notes = result.notes;
        attendee.role = result.role;
        attendee.team = result.team;
        attendee.group_leader = result.group_leader;
        attendee.discount = result.discount;
        attendee.time_registered = result.time_registered;

        return attendee;
    }
}
