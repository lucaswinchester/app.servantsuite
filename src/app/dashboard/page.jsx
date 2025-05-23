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
    <>
      <SidebarLayout>
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Good morning, <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">Pastor John!</span> ✨
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Ready to inspire your congregation today?
          </p>
        </div>

        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 relative group">
            <Bell size={20} className="group-hover:bg-gradient-to-r group-hover:from-[#ff6b6b] group-hover:to-[#ffa36b] group-hover:bg-clip-text group-hover:text-transparent" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 group">
            <MessageSquare size={20} className="group-hover:bg-gradient-to-r group-hover:from-[#ff6b6b] group-hover:to-[#ffa36b] group-hover:bg-clip-text group-hover:text-transparent" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 group">
            <HelpCircle size={20} className="group-hover:bg-gradient-to-r group-hover:from-[#ff6b6b] group-hover:to-[#ffa36b] group-hover:bg-clip-text group-hover:text-transparent" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SermonCard sermons={sermons} />
        <SeriesCard series={series} />
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            index={index}
            icon={action.icon}
            title={action.title}
            description={action.description}
          />
        ))}
      </section>
    </SidebarLayout>
    </>
  );
}
