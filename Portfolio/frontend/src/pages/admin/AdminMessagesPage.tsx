import React, { useEffect, useState } from 'react';
import { messageService } from '../../services/messageService';
import { Message } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await messageService.getMessages();
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (filter === 'unread') {
      setFilteredMessages(messages.filter(m => !m.read));
    } else if (filter === 'read') {
      setFilteredMessages(messages.filter(m => m.read));
    } else {
      setFilteredMessages(messages);
    }
  }, [filter, messages]);

  const handleMarkRead = async (id: string) => {
    try {
      await messageService.markRead(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete message permanently?')) {
      try {
        await messageService.deleteMessage(id);
        if (activeMessage?._id === id) setActiveMessage(null);
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner message="Fetching user messages..." />;

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-gradient mb-1">Messages & Inquiries</h2>
          <p className="text-secondary-custom mb-0">Messages submitted through the portfolio contact form.</p>
        </div>

        <div className="btn-group font-mono">
          <button 
            className={`btn btn-sm ${filter === 'all' ? 'btn-brand' : 'btn-outline-secondary'}`}
            onClick={() => setFilter('all')}
          >
            All ({messages.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'unread' ? 'btn-brand' : 'btn-outline-secondary'}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({messages.filter(m => !m.read).length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'read' ? 'btn-brand' : 'btn-outline-secondary'}`}
            onClick={() => setFilter('read')}
          >
            Read ({messages.filter(m => m.read).length})
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-card p-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-4 text-secondary-custom small">
                No messages found.
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {filteredMessages.map((m) => (
                  <div 
                    key={m._id} 
                    className={`p-3 rounded-3 cursor-pointer transition-all ${activeMessage?._id === m._id ? 'bg-cyan bg-opacity-25 border border-info' : 'bg-dark bg-opacity-50 border border-secondary border-opacity-25'}`}
                    onClick={() => {
                      setActiveMessage(m);
                      if (!m.read && m._id) handleMarkRead(m._id);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-primary">{m.name}</span>
                      {!m.read && <span className="badge bg-danger">NEW</span>}
                    </div>
                    <div className="text-cyan small fw-semibold text-truncate mb-1">{m.subject}</div>
                    <div className="text-secondary-custom extra-small font-mono">{m.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-7">
          {activeMessage ? (
            <div className="glass-card p-4 p-md-5">
              <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 gap-2 pb-3 border-bottom border-secondary border-opacity-25">
                <div>
                  <h4 className="fw-bold text-gradient mb-1">{activeMessage.subject}</h4>
                  <div className="text-secondary-custom small">
                    From <span className="text-primary fw-semibold">{activeMessage.name}</span> (<a href={`mailto:${activeMessage.email}`} className="text-cyan">{activeMessage.email}</a>)
                  </div>
                </div>
                <button onClick={() => handleDelete(activeMessage._id!)} className="btn btn-sm btn-outline-danger">
                  <i className="bi bi-trash-fill me-1"></i> Delete
                </button>
              </div>

              <div className="p-4 bg-dark bg-opacity-50 rounded-3 border border-secondary border-opacity-25 mb-4 text-primary" style={{ whiteSpace: 'pre-wrap' }}>
                {activeMessage.message}
              </div>

              <a href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`} className="btn btn-brand">
                <i className="bi bi-reply-fill me-1"></i> Reply via Email
              </a>
            </div>
          ) : (
            <div className="glass-card p-5 text-center text-secondary-custom">
              <i className="bi bi-chat-left-text fs-1 text-secondary d-block mb-3"></i>
              <h5 className="fw-bold">Select a message from the list</h5>
              <p className="small mb-0">Click on any message card on the left to read full contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
