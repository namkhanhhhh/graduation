import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInvitationById, saveInvitation, isSlugUnique } from '../utils/storage';
import { getAllImageFiles, getImageUrl } from '../utils/assets';
import InvitationCard from '../components/InvitationCard';
import { FiArrowLeft, FiSave, FiEye, FiCopy, FiCheck } from 'react-icons/fi';
import './Admin.css';

const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [slugError, setSlugError] = useState('');
  const [showMobilePreview, setShowMobilePreview] = useState(false); // for responsive preview

  useEffect(() => {
    const data = getInvitationById(id);
    if (data) {
      setFormData(data);
    } else {
      navigate('/admin');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Validate slug on change
      if (name === 'slug') {
        if (!isSlugUnique(value, id)) {
          setSlugError('Đường dẫn này đã tồn tại, vui lòng chọn đường dẫn khác.');
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          setSlugError('Đường dẫn chỉ được chứa chữ cái viết thường, số và dấu gạch ngang.');
        } else {
          setSlugError('');
        }
      }
    }
  };

  const handleImageSelect = (filename) => {
    setFormData(prev => ({
      ...prev,
      leftPageImage: filename
    }));
  };

  const handleSave = async () => {
    if (slugError) {
      alert('Vui lòng sửa lỗi đường dẫn trước khi lưu!');
      return;
    }
    await saveInvitation(formData);
    alert('Đã lưu cấu hình thiệp thành công!');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${formData.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert(`Đã copy link: ${url}`);
    });
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="admin-editor-layout">
      <div className="editor-sidebar">
        <div className="editor-header">
          <button className="btn-back" onClick={() => navigate('/admin')}>
            <FiArrowLeft /> Quay lại
          </button>
          <h2>Chỉnh sửa thiệp</h2>
          <div className="header-actions">
            <button className="btn-secondary" onClick={handleCopyLink}>
              <FiCopy /> Copy Link
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <FiSave /> Lưu
            </button>
          </div>
        </div>

        <div className="editor-form">
          <div className="form-group">
            <label>Đường dẫn tĩnh (Slug / Param)</label>
            <div className="input-group">
              <span className="input-prefix">/</span>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                placeholder="VD: giadinh, banbe"
              />
            </div>
            {slugError && <span className="error-text">{slugError}</span>}
          </div>

          <div className="form-group">
            <label>Chọn ảnh thiệp bên trái</label>
            <div className="image-gallery">
              {getAllImageFiles().map(img => (
                <div 
                  key={img.filename} 
                  className={`gallery-item ${formData.leftPageImage === img.filename ? 'selected' : ''}`}
                  onClick={() => handleImageSelect(img.filename)}
                >
                  <img src={img.url} alt={img.filename} />
                  {formData.leftPageImage === img.filename && (
                    <div className="check-overlay"><FiCheck /></div>
                  )}
                </div>
              ))}
            </div>
            <small>Ảnh dọc hoặc ngang đều được hỗ trợ (tự động căn giữa).</small>
          </div>

          <div className="form-group">
            <label>Tên Khách Mời / Tên Thiệp (Nổi bật)</label>
            <input type="text" name="personName" value={formData.personName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Vai trò người gửi</label>
            <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Lời nhắn mở đầu</label>
            <textarea name="openingMessage" value={formData.openingMessage} onChange={handleChange} rows="3"></textarea>
          </div>

          <div className="form-group">
            <label>Thời gian</label>
            <input type="text" name="dateAndTime" value={formData.dateAndTime} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Địa điểm</label>
            <textarea name="locationName" value={formData.locationName} onChange={handleChange} rows="2"></textarea>
          </div>

          <div className="form-group">
            <label>SĐT Liên hệ</label>
            <input type="text" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Link Facebook</label>
            <input type="text" name="contactInfo.facebookLink" value={formData.contactInfo.facebookLink} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Link Google Maps</label>
            <input type="text" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Lời kết</label>
            <input type="text" name="closingMessage" value={formData.closingMessage} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="editor-preview">
        <div className="preview-header">
          <h3>Xem trước (Preview)</h3>
          <button className="btn-toggle-view" onClick={() => setShowMobilePreview(!showMobilePreview)}>
            <FiEye /> {showMobilePreview ? 'Chuyển view Desktop' : 'Chuyển view Mobile'}
          </button>
        </div>
        <div className={`preview-container ${showMobilePreview ? 'mobile-view' : 'desktop-view'}`}>
          <div className="preview-wrapper">
             <InvitationCard config={{...formData, leftPageImage: getImageUrl(formData.leftPageImage)}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
