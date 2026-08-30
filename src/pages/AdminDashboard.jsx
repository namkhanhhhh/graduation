import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInvitations, createNewInvitation, deleteInvitation, saveInvitation } from '../utils/storage';
import { getImageUrl } from '../utils/assets';
import { FiEdit, FiCopy, FiTrash2, FiExternalLink, FiPlus } from 'react-icons/fi';
import './Admin.css'; // We will create this

const AdminDashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setInvitations(getInvitations());
  };

  const handleCreate = async () => {
    const newInv = createNewInvitation();
    await saveInvitation(newInv);
    loadData();
    navigate(`/admin/edit/${newInv.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiệp này?')) {
      deleteInvitation(id);
      loadData();
    }
  };

  const handleCopyLink = (slug) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert(`Đã copy link: ${url}`);
    });
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Quản lý thiệp mời</h1>
        <button className="btn-primary" onClick={handleCreate}>
          <FiPlus /> Tạo thiệp mới
        </button>
      </header>

      <div className="invitation-grid">
        {invitations.map(inv => (
          <div key={inv.id} className="invitation-block">
            <div className="block-image">
              <img src={getImageUrl(inv.leftPageImage)} alt={inv.personName} />
            </div>
            <div className="block-content">
              <h3>{inv.personName}</h3>
              <p className="slug-text">/{inv.slug}</p>
              
              <div className="block-actions">
                <button title="Chỉnh sửa" onClick={() => navigate(`/admin/edit/${inv.id}`)}>
                  <FiEdit />
                </button>
                <button title="Copy Link" onClick={() => handleCopyLink(inv.slug)}>
                  <FiCopy />
                </button>
                <button title="Xem trực tiếp" onClick={() => window.open(`/${inv.slug}`, '_blank')}>
                  <FiExternalLink />
                </button>
                <button title="Xóa" onClick={() => handleDelete(inv.id)} className="btn-danger">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
