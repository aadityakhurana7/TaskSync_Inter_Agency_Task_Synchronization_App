import { Observable, Frame } from '@nativescript/core';
import { jobStore } from '../../services/job-store';
import { commentStore } from '../../services/comment-store';
import { authService } from '../../services/auth-service';
import { Job } from '../../models/job';
import { Comment } from '../../models/user';
import { formatDate } from '../../utils/date-formatter';

export class JobDetailsViewModel extends Observable {
    private _job: Job;
    private _comments: Array<Comment & { formattedDate: string }> = [];
    private _newComment = '';

    constructor(private jobId: string) {
        super();
        this.loadJob();
        this.loadComments();
    }

    get job() { return this._job; }
    set job(value: Job) {
        if (this._job !== value) {
            this._job = value;
            this.notifyPropertyChange('job', value);
        }
    }

    get comments() { return this._comments; }
    set comments(value: Comment[]) {
        if (this._comments !== value) {
            this._comments = value.map(comment => ({
                ...comment,
                formattedDate: formatDate(comment.createdAt)
            }));
            this.notifyPropertyChange('comments', this._comments);
        }
    }

    get newComment() { return this._newComment; }
    set newComment(value: string) {
        if (this._newComment !== value) {
            this._newComment = value;
            this.notifyPropertyChange('newComment', value);
        }
    }

    get canCloseJob() {
        return authService.isAdmin();
    }

    addComment() {
        if (!this.newComment.trim()) return;

        const user = authService.getUser();
        if (!user) return;

        commentStore.addComment(this.jobId, user.username, this.newComment.trim());
        this.newComment = '';
        this.loadComments();
    }

    closeJob() {
        if (!authService.isAdmin()) return;
        
        jobStore.updateJobStatus(this.jobId, 'Completed');
        this.loadJob();
        
        // Add system comment about job closure
        const user = authService.getUser();
        if (user) {
            commentStore.addComment(
                this.jobId,
                'System',
                `Job marked as completed by ${user.username}`
            );
            this.loadComments();
        }
    }

    logout() {
        authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }

    private loadJob() {
        const jobs = jobStore.getJobs();
        this.job = jobs.find(j => j.id === this.jobId);
    }

    private loadComments() {
        this.comments = commentStore.getCommentsForJob(this.jobId);
    }
}