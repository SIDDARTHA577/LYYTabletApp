// Chrome/navigation string dictionary for the English/Chinese toggle in
// Settings. Scope: nav, dashboard, reports, notifications, settings, and
// common actions — the inspection form itself already shows both languages
// inline for every field (see Section*.tsx labelCn props), which is a
// different, deliberately-always-on bilingual treatment for the regulated
// report content; this dictionary is for the surrounding app chrome only.
export type Lang = 'en' | 'zh';

export const translations = {
  // Nav
  dashboard: { en: 'Dashboard', zh: '仪表盘' },
  fabricInspection: { en: 'Fabric Inspection', zh: '面料检验' },
  reports: { en: 'Reports', zh: '报告' },
  notifications: { en: 'Notifications', zh: '通知' },
  settings: { en: 'Settings', zh: '设置' },
  inspectionModules: { en: 'INSPECTION MODULES', zh: '检验模块' },
  logOut: { en: 'Log Out', zh: '退出登录' },
  comingSoon: { en: 'Soon', zh: '即将推出' },

  // Dashboard & Common Forms
  goodDay: { en: 'Good day', zh: '你好' },
  yourAssignedModules: { en: 'Your assigned inspection modules', zh: '您分配的检验模块' },
  statAssigned: { en: 'Assigned', zh: '已分配' },
  statToday: { en: "Today's", zh: '今日' },
  statPending: { en: 'Pending', zh: '待处理' },
  statInProgress: { en: 'In Progress', zh: '进行中' },
  statCompleted: { en: 'Completed', zh: '已完成' },
  statOverdue: { en: 'Overdue', zh: '逾期' },
  todaysInspections: { en: "Today's Inspections", zh: '今日检验' },
  recentActivity: { en: 'Recent Activity', zh: '最近活动' },
  noInspectionsToday: { en: 'No inspections started today.', zh: '今天还没有开始检验。' },
  noRecentActivity: { en: 'No recent activity yet.', zh: '暂无最近活动。' },
  viewAll: { en: 'View all', zh: '查看全部' },
  quickActions: { en: 'Quick Actions', zh: '快捷操作' },
  newInspection: { en: 'New Inspection', zh: '新建检验' },
  chooseInspectionType: { en: 'Choose an inspection type to begin', zh: '请选择检验类型开始' },
  uploadFile: { en: 'Upload File', zh: '上传文件' },
  instructions: { en: 'Instructions', zh: '使用说明' },

  // Reports
  inspectionHistory: { en: 'Inspection History', zh: '检验历史' },
  dailyMonthlySummary: { en: 'Daily / Monthly Summary', zh: '每日/每月汇总' },
  last7Days: { en: 'Last 7 days', zh: '最近7天' },
  last6Months: { en: 'Last 6 months', zh: '最近6个月' },
  defectReport: { en: 'Defect Report', zh: '缺陷报告' },
  defectReportSubtitle: { en: 'Most frequent defect codes across all inspections', zh: '所有检验中最常见的缺陷代码' },
  exportCsv: { en: 'Export CSV', zh: '导出CSV' },
  searchPlaceholder: { en: 'Search by style, PO, colour…', zh: '按款号、订单号、颜色搜索…' },
  filterAll: { en: 'All', zh: '全部' },
  filterDraft: { en: 'Draft', zh: '草稿' },
  filterSubmitted: { en: 'Submitted', zh: '已提交' },
  noResults: { en: 'No inspections match your search.', zh: '没有符合搜索条件的检验。' },

  // Notifications
  markAllRead: { en: 'Mark all as read', zh: '全部标为已读' },
  noNotifications: { en: 'No notifications yet.', zh: '暂无通知。' },
  noNotificationsBody: { en: "You'll see updates about your inspections here.", zh: '您的检验相关更新将显示在此处。' },

  // Settings
  profile: { en: 'Profile', zh: '个人资料' },
  language: { en: 'Language', zh: '语言' },
  english: { en: 'English', zh: '英文' },
  chinese: { en: '中文', zh: '中文' },
  notificationPrefs: { en: 'Notification Preferences', zh: '通知偏好' },
  enablePushNotifications: { en: 'Enable notifications', zh: '启用通知' },
  syncStatus: { en: 'Sync Status', zh: '同步状态' },
  online: { en: 'Online', zh: '在线' },
  offline: { en: 'Offline', zh: '离线' },
  allChangesSaved: { en: 'All changes saved', zh: '所有更改已保存' },
  lastSynced: { en: 'Last synced', zh: '上次同步' },
  about: { en: 'About', zh: '关于' },
  appVersion: { en: 'App version', zh: '应用版本' },

  // Common
  save: { en: 'Save', zh: '保存' },
  cancel: { en: 'Cancel', zh: '取消' },
  scan: { en: 'Scan', zh: '扫描' },
} as const;

export type TranslationKey = keyof typeof translations;
