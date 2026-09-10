import { RiBuilding2Line } from 'react-icons/ri';
import PageHeader from '../../components/layout/PageHeader';

const OwnerDashboard = () => {
  return (
    <div className="p-8">
      <PageHeader title="لوحة تحكم المالك" icon={<RiBuilding2Line />} role="owner" />
    </div>
  );
};

export default OwnerDashboard;
