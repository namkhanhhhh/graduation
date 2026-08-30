import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvitationBySlug } from '../utils/storage';
import { getImageUrl } from '../utils/assets';
import InvitationCard from '../components/InvitationCard';

const InvitationView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine the actual slug (default to 'sample' if at root)
    const activeSlug = slug || 'sample';
    const data = getInvitationBySlug(activeSlug);
    
    if (data) {
      setConfig(data);
    } else if (!slug) {
      // If root and no sample, maybe navigate to admin
      navigate('/admin');
    }
    setLoading(false);
  }, [slug, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!config) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Không tìm thấy thiệp</h2>
        <p>URL không hợp lệ hoặc thiệp đã bị xóa.</p>
        <button onClick={() => navigate('/admin')} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Về trang quản lý
        </button>
      </div>
    );
  }

  return <InvitationCard config={{...config, leftPageImage: getImageUrl(config.leftPageImage)}} />;
};

export default InvitationView;
