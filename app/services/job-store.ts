import { Observable } from '@nativescript/core';
import { Job } from '../models/job';

class JobStore extends Observable {
    private jobs: Job[] = [];

    addJob(job: Job) {
        this.jobs.push(job);
        this.notifyPropertyChange('jobs', this.jobs);
    }

    getJobs(): Job[] {
        return this.jobs;
    }

    getFilteredJobs(priority?: string, status?: string): Job[] {
        return this.jobs.filter(job => 
            (!priority || job.priority === priority) &&
            (!status || job.status === status)
        );
    }

    updateJobStatus(jobId: string, status: 'Open' | 'In Progress' | 'Completed') {
        const job = this.jobs.find(j => j.id === jobId);
        if (job) {
            job.status = status;
            this.notifyPropertyChange('jobs', this.jobs);
        }
    }
}

export const jobStore = new JobStore();