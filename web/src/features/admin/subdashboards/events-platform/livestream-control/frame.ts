import type { SubdashboardFeatureFrame } from '../../types';

export const frame: SubdashboardFeatureFrame = {
  sectionKey: 'events_ticketing_system',
  featureId: 'livestream_control',
  featureLabel: 'Livestream Control',
  headerMeta: 'Event lifecycle frame for scheduling, ticketing, and live execution.',
  layoutClass: 'subdashboardLayoutEvents',
  tiles: [
    { id: 'hero', area: 'hero', title: 'Overview' },
    { id: 'event_calendar', area: 'a', title: 'Event Calendar' },
    { id: 'ticket_velocity', area: 'b', title: 'Ticket Velocity' },
    { id: 'attendance_forecast', area: 'c', title: 'Attendance Forecast' },
    { id: 'event_operations_board', area: 'd', title: 'Event Operations Board' },
    { id: 'livestream_control', area: 'e', title: 'Livestream Control' },
    { id: 'event_analytics', area: 'f', title: 'Event Analytics' }
  ]
};
