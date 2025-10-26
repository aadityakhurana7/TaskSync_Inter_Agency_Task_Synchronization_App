import { Observable } from '@nativescript/core';
import { Comment } from '../models/user';

class CommentStore extends Observable {
    private comments: Comment[] = [];

    addComment(jobId: string, username: string, text: string) {
        const comment: Comment = {
            id: Date.now().toString(),
            jobId,
            username,
            text,
            createdAt: new Date()
        };
        this.comments.push(comment);
        this.notifyPropertyChange('comments', this.comments);
    }

    getCommentsForJob(jobId: string): Comment[] {
        return this.comments.filter(comment => comment.jobId === jobId);
    }
}

export const commentStore = new CommentStore();