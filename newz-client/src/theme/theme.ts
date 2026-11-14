import { theme } from 'antd';

export const appTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#D71920',
    colorInfo: '#D71920',
    colorSuccess: '#2E7D32',
    colorWarning: '#ED6C02',
    colorError: '#D71920',
    colorTextBase: '#222222',
    colorTextSecondary: '#666666',
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F7F7F7',
    colorBorder: '#E5E5E5',
    borderRadius: 8,
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
  },
  components: {
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 40,
    },
    Table: {
      borderRadiusLG: 8,
    },
    Modal: {
      borderRadiusLG: 12,
    },
    Layout: {
      bodyBg: '#F7F7F7',
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
    },
  },
};

export default appTheme;