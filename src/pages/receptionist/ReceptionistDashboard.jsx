import { RiCustomerService2Line } from 'react-icons/ri';
import PageHeader from '../../components/layout/PageHeader';

const ReceptionistDashboard = () => {
  return (
    <div className="p-8">
      <PageHeader title="لوحة تحكم الاستقبال" icon={<RiCustomerService2Line />} role="receptionist" />
    </div>
  );
};

export default ReceptionistDashboard;
