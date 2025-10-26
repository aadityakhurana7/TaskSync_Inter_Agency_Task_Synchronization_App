import { NavigatedData, Page } from '@nativescript/core';
import { JobsListViewModel } from './jobs-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new JobsListViewModel();
}

export function onAddJobTap() {
    // Navigate to add job page
    const frame = require('@nativescript/core').Frame;
    frame.topmost().navigate('pages/add-job/add-job-page');
}