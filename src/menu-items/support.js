// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'pipeline',
  title: 'Pipeline',
  type: 'group',
  children: [
    {
      id: 'pipeline',
      title: 'Offshore Demand and Pipeline Report',
      type: 'item',
      url: '/pipeline',
      icon: icons.ChromeOutlined
    }
  ]
};

export default support;
