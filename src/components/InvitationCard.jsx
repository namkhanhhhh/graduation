import { useState } from 'react';

const InvitationCard = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!config) return null;

  return (
    <div className="app-container">
      <div
        className={`invitation-card ${isOpen ? 'is-open' : ''}`}
        onClick={handleToggle}
      >
        <div className="card-cover">
          <div className="card-front">
            <div className="front-content">
              <h1>Graduation</h1>
              <p>Class of 2026</p>
            </div>

            <div className="pulse-hint" style={{ opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s ease' }}>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
              </div>
              <p>Chạm để mở thiệp</p>
            </div>
          </div>

          <div className="card-back">
            <div className="image-container">
              <img src={config.leftPageImage} alt="Graduation Photo" />
            </div>
          </div>
        </div>

        <div className="card-inside">
          <div className="invitation-details">
            <div className="header-section">
              <h2>{config.title}</h2>
              <div className="sender-name">{config.senderName}</div>
              <div className="person-name">{config.personName}</div>
            </div>

            <p className="opening-msg">{config.openingMessage}</p>

            <div className="info-grid">
              <div className="info-item">
                <span className="label">Thời Gian</span>
                <span className="value">{config.dateAndTime}</span>
              </div>

              <div className="info-item">
                <span className="label">Địa Điểm</span>
                <span className="value">{config.locationName}</span>
              </div>
            </div>

            <div className="contact-rsvp">
              <span className="label">Đầu mối liên hệ:</span>
              <div className="contact-links">
                <a href={`tel:${config.contactInfo.phone.replace(/\s+/g, '')}`} className="contact-btn phone-btn" onClick={(e) => e.stopPropagation()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {config.contactInfo.phone}
                </a>
                <span className="divider">•</span>
                <a href={config.contactInfo.facebookLink} target="_blank" rel="noopener noreferrer" className="contact-btn facebook-btn" onClick={(e) => e.stopPropagation()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  Facebook
                </a>
              </div>
            </div>

            <p className="closing-msg">{config.closingMessage}</p>

            <a
              href={config.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              Chỉ Đường (Google Maps)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
