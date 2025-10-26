import { NavigatedData, Page } from '@nativescript/core';
import { JobDetailsViewModel } from './job-details-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new JobDetailsViewModel(args.context.jobId);
    }
}