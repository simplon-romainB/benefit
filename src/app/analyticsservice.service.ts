import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

declare const ga: any;
export interface AnalyticsEvent {
  type: 'PAGEVIEW' | 'EVENT';
  category?: string;
  action?: string;
  label: string;
}

@Injectable()
export class AnalyticsService {
  public cookie = true;
  public cookieSet: any;
  eventsQueue$ = new ReplaySubject<AnalyticsEvent>();

  constructor() {}

  public startTracking(): void {
    ga('create', console.log(ga), 'auto');
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.eventsQueue$.subscribe((e: AnalyticsEvent) => {
      if (e.type === 'PAGEVIEW') {
        ga('send', {
            hitType: 'pageview',
            page: e.label,
          });
      } else if (e.type === 'EVENT') {
        ga('send', {
            hitType: 'event',
            eventCategory: e.category,
            eventAction: e.action,
            eventLabel: e.label,
          });
      }
    });
  }

  public trackVirtualPageview(name: string): void {
    this.eventsQueue$.next({type: 'PAGEVIEW', label: name});
  }

  public trackEvent(category: string, action: string, label: string) {
    this.eventsQueue$.next({type: 'EVENT', category, action, label});
  }

  
}