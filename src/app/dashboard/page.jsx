'use client';

import React from 'react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import StatCard from '../../components/dashboard/StatCard';
import SermonCard from '../../components/dashboard/SermonCard';
import SeriesCard from '../../components/dashboard/SeriesCard';
import ActionCard from '../../components/dashboard/ActionCard';
import {
  Bell,
  MessageSquare,
  HelpCircle,
  Calendar,
  Users,
  CheckSquare,
  Sparkles,
  Library,
  CheckCircle
} from 'lucide-react';
import '../../styles/dashboard.css';

export default function Dashboard() {
  // Sample data
  const stats = [
    {
      icon: <Calendar size={24} />,
      label: 'Next Sunday',
      value: '3 days',
      change: 'May 26, 2025'
    },
    {
      icon: <Users size={24} />,
      label: 'Team Online',
      value: '4',
      change: '+2 from yesterday'
    },
    {
      icon: <CheckSquare size={24} />,
      label: 'Pending Tasks',
      value: '2',
      change: 'Almost done!'
    }
  ];

  const sermons = [
    {
      title: 'The Power of Faith',
      meta: 'May 19, 2025 • Published',
      status: 'complete',
      progress: '100%'
    },
    {
      title: 'Walking in Grace',
      meta: 'May 12, 2025 • Published',
      status: 'complete',
      progress: '100%'
    },
    {
      title: 'Finding Peace',
      meta: 'Draft • In Progress',
      status: 'partial',
      progress: '45%'
    }
  ];

  const series = [
    {
      title: '🌅 Summer of Hope',
      progress: '33%',
      progressText: '2 of 6 sermons complete'
    },
    {
      title: '📖 Back to Basics',
      status: 'Starting June 30'
    }
  ];

  const actions = [
    {
      icon: <Sparkles size={24} />,
      title: 'Generate Slides',
      description: 'Create beautiful presentations with AI magic'
    },
    {
      icon: <Users size={24} />,
      title: 'Team Updates',
      description: 'See what your ministry team is working on'
    },
    {
      icon: <Library size={24} />,
      title: 'Resource Library',
      description: 'Browse sermons, media, and study materials'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Sunday Checklist',
      description: "Make sure everything's ready for service"
    }
  ];

  return (
    <SidebarLayout>
      {/* Top Bar */}
      <div className="top-bar shadcn-card">
        <div className="welcome-section">
          <h1>Good morning, <span className="gradient-text">Pastor John!</span> ✨</h1>
          <p className="welcome-subtitle">
            Ready to inspire your congregation today?
          </p>
        </div>

        <div className="top-actions">
          <button className="notification-btn shadcn-button-ghost shadcn-button-icon">
            <Bell size={20} />
            <span className="notification-badge shadcn-badge shadcn-badge-destructive">
              3
            </span>
          </button>
          <button className="notification-btn shadcn-button-ghost shadcn-button-icon">
            <MessageSquare size={20} />
          </button>
          <button className="notification-btn shadcn-button-ghost shadcn-button-icon">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="quick-stats">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </section>

      {/* Main Cards */}
      <section className="main-cards">
        <SermonCard sermons={sermons} />
        <SeriesCard series={series} />
      </section>

      {/* Quick Actions Grid */}
      <section className="quick-actions-grid">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            icon={action.icon}
            title={action.title}
            description={action.description}
          />
        ))}
      </section>
    </SidebarLayout>
  );
}
