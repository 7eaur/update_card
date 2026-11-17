import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

class ExperienceBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="error-page"><h1>نرجعك للطريق</h1><p>تعذّر عرض الصفحة. تقدر تتصفح خدماتنا أو تتواصل معنا مباشرة.</p><a className="button primary" href="https://updatecard.net/services/">تصفح الخدمات</a><a href="https://wa.me/967770498884">تواصل عبر واتساب</a></main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')).render(<React.StrictMode><ExperienceBoundary><App /></ExperienceBoundary></React.StrictMode>);
