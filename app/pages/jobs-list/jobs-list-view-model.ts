import { Observable, Frame } from '@nativescript/core';
import { jobStore } from '../../services/job-store';
import { authService } from '../../services/auth-service';

export class JobsListViewModel extends Observable {
    private _jobs = [];

    constructor() {
        super();
        this.refreshJobs();
    }

    get jobs() {
        return this._jobs;
    }

    set jobs(value) {
        if (this._jobs !== value) {
            this._jobs = value;
            this.notifyPropertyChange('jobs', value);
        }
    }

    get isAdmin() {
        return authService.isAdmin();
    }

    filterAll() {
        this.jobs = jobStore.getJobs();
    }

    filterHighPriority() {
        this.jobs = jobStore.getFilteredJobs('High');
    }

    filterOpen() {
        this.jobs = jobStore.getFilteredJobs(undefined, 'Open');
    }

    logout() {
        authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }

    onJobTap(args) {
        const job = this.jobs[args.index];
        Frame.topmost().navigate({
            moduleName: 'pages/job-details/job-details-page',
            context: { jobId: job.id }
        });
    }

    private refreshJobs() {
        this.jobs = jobStore.getJobs();
    }
}