import { Link } from 'react-router-dom';
import './index.scss';

const Landing = () => {
  return (
    <div className="landing">
      <nav className="landing__nav">
        <div className="landing__logo">
          <h2>Task Scheduler</h2>
        </div>
        <div className="landing__nav-links">
          <Link to="/signin" className="landing__nav-link">Sign In</Link>
          <Link to="/signup" className="landing__nav-btn">Get Started</Link>
        </div>
      </nav>

      <section className="landing__hero">
        <div className="landing__hero-content">
          <h1 className="landing__title">
            Organize Your Tasks,<br />
            <span className="landing__title-gradient">Simplify Your Life</span>
          </h1>
          <p className="landing__subtitle">
            A powerful yet simple task scheduler to help you stay productive and organized. 
            Manage your daily tasks, set priorities, and never miss a deadline.
          </p>
          <div className="landing__cta">
            <Link to="/signup" className="landing__cta-primary">Start Free Today</Link>
            <Link to="/signin" className="landing__cta-secondary">Sign In</Link>
          </div>
        </div>
        <div className="landing__hero-image">
          <div className="landing__mockup">
            <div className="mockup__window">
              <div className="mockup__header">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="mockup__content">
                <div className="mockup__task">
                  <div className="mockup__checkbox"></div>
                  <div className="mockup__text"></div>
                </div>
                <div className="mockup__task">
                  <div className="mockup__checkbox checked"></div>
                  <div className="mockup__text done"></div>
                </div>
                <div className="mockup__task">
                  <div className="mockup__checkbox"></div>
                  <div className="mockup__text"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__features">
        <h2 className="landing__features-title">Why Choose Task Scheduler?</h2>
        <div className="landing__features-grid">
          <div className="landing__feature">
            <div className="landing__feature-icon">📋</div>
            <h3>Easy Task Management</h3>
            <p>Create, edit, and organize your tasks with an intuitive interface</p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">🎯</div>
            <h3>Priority Levels</h3>
            <p>Set priorities to focus on what matters most</p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">📅</div>
            <h3>Due Dates</h3>
            <p>Never miss a deadline with date tracking and reminders</p>
          </div>
          <div className="landing__feature">
            <div className="landing__feature-icon">🏷️</div>
            <h3>Categories</h3>
            <p>Organize tasks by categories for better management</p>
          </div>
        </div>
      </section>

      <footer className="landing__footer">
        <p>© 2024 Task Scheduler. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;