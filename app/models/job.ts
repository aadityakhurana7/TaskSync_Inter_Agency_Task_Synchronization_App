export interface Job {
    id: string;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    location: string;
    startDate: Date;
    status: 'Open' | 'In Progress' | 'Completed';
    budget: number;
    contactPerson: string;
    contactPhone: string;
}