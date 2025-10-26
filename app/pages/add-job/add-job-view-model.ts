import { Observable, Frame } from '@nativescript/core';
import { jobStore } from '../../services/job-store';

export class AddJobViewModel extends Observable {
    private _title = '';
    private _description = '';
    private _location = '';
    private _budget = '';
    private _contactPerson = '';
    private _contactPhone = '';
    private _priorities = ['High', 'Medium', 'Low'];
    private _selectedPriorityIndex = 0;

    constructor() {
        super();
    }

    get title() { return this._title; }
    set title(value) {
        if (this._title !== value) {
            this._title = value;
            this.notifyPropertyChange('title', value);
        }
    }

    get description() { return this._description; }
    set description(value) {
        if (this._description !== value) {
            this._description = value;
            this.notifyPropertyChange('description', value);
        }
    }

    get location() { return this._location; }
    set location(value) {
        if (this._location !== value) {
            this._location = value;
            this.notifyPropertyChange('location', value);
        }
    }

    get budget() { return this._budget; }
    set budget(value) {
        if (this._budget !== value) {
            this._budget = value;
            this.notifyPropertyChange('budget', value);
        }
    }

    get contactPerson() { return this._contactPerson; }
    set contactPerson(value) {
        if (this._contactPerson !== value) {
            this._contactPerson = value;
            this.notifyPropertyChange('contactPerson', value);
        }
    }

    get contactPhone() { return this._contactPhone; }
    set contactPhone(value) {
        if (this._contactPhone !== value) {
            this._contactPhone = value;
            this.notifyPropertyChange('contactPhone', value);
        }
    }

    get priorities() { return this._priorities; }
    get selectedPriorityIndex() { return this._selectedPriorityIndex; }
    set selectedPriorityIndex(value) {
        if (this._selectedPriorityIndex !== value) {
            this._selectedPriorityIndex = value;
            this.notifyPropertyChange('selectedPriorityIndex', value);
        }
    }

    saveJob() {
        const newJob = {
            id: Date.now().toString(),
            title: this.title,
            description: this.description,
            priority: this.priorities[this.selectedPriorityIndex] as 'High' | 'Medium' | 'Low',
            location: this.location,
            startDate: new Date(),
            status: 'Open' as const,
            budget: parseFloat(this.budget),
            contactPerson: this.contactPerson,
            contactPhone: this.contactPhone
        };

        jobStore.addJob(newJob);
        Frame.topmost().goBack();
    }
}