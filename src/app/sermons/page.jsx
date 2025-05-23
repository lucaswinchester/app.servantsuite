'use client';

import React from 'react';
import SidebarLayout from '../../components/layout/SidebarLayout';
import SermonRow from '../../components/sermons/SermonRow';
import SearchBox from '../../components/ui/SearchBox';
import Button from '../../components/ui/Button';
import {
  Search,
  Upload,
  Sparkles,
  Edit,
  Eye,
  Calendar,
  MoreHorizontal,
  BookOpen,
  Save,
  Play
} from 'lucide-react';
import '../../styles/sermons.css';

export default function SermonsPage() {
  // Sample data
  const sermons = [
    {
      title: 'The Power of Faith',
      slideTitle: 'THE POWER OF FAITH',
      status: 'Published',
      scripture: 'Hebrews 11:1-6',
      date: 'May 19, 2025',
      series: 'Summer of Hope',
      progress: null,
      icon: <Play size={12} />,
      media: [
        { type: 'slides', label: '12 Slides' },
        { type: 'video', label: 'Video' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '👥 2,450 views',
        '⏱️ 42 min',
        '💬 23 comments'
      ],
      actions: [
        { icon: <Edit size={14} />, label: 'Edit', primary: true },
        { icon: <Eye size={14} />, label: 'View' },
        { icon: <Calendar size={14} />, label: 'Schedule' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    },
    {
      title: 'Walking in Grace',
      slideTitle: 'WALKING IN GRACE',
      status: 'Published',
      scripture: 'Ephesians 2:8-10',
      date: 'May 12, 2025',
      series: 'Summer of Hope',
      progress: null,
      icon: <Play size={12} />,
      media: [
        { type: 'slides', label: '15 Slides' },
        { type: 'video', label: 'Video' },
        { type: 'audio', label: 'Audio' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '👥 1,890 views',
        '⏱️ 38 min',
        '💬 15 comments'
      ],
      actions: [
        { icon: <Edit size={14} />, label: 'Edit', primary: true },
        { icon: <Eye size={14} />, label: 'View' },
        { icon: <Calendar size={14} />, label: 'Schedule' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    },
    {
      title: 'Finding Peace',
      slideTitle: 'FINDING PEACE',
      status: 'Draft',
      scripture: 'Philippians 4:6-7',
      date: 'May 26, 2025',
      series: 'Summer of Hope',
      progress: 45,
      icon: <Edit size={12} />,
      media: [
        { type: 'slides', label: '8 Slides' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '📝 45% complete',
        '⏱️ Est. 35 min',
        '🎯 Due May 24'
      ],
      actions: [
        { icon: <Edit size={14} />, label: 'Edit', primary: true },
        { icon: <Eye size={14} />, label: 'View' },
        { icon: <Calendar size={14} />, label: 'Schedule' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    },
    {
      title: 'Love in Action',
      slideTitle: 'LOVE IN ACTION',
      status: 'Scheduled',
      scripture: '1 John 3:16-18',
      date: 'June 2, 2025',
      series: 'Back to Basics',
      progress: null,
      icon: <Calendar size={12} />,
      media: [
        { type: 'slides', label: '11 Slides' },
        { type: 'video', label: 'Video' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '✅ Ready to publish',
        '⏱️ 40 min',
        '📅 Auto-publish June 2'
      ],
      actions: [
        { icon: <Edit size={14} />, label: 'Edit', primary: true },
        { icon: <Eye size={14} />, label: 'View' },
        { icon: <Calendar size={14} />, label: 'Schedule' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    },
    {
      title: 'Building on the Rock',
      slideTitle: 'BUILDING ON THE ROCK',
      status: 'Published',
      scripture: 'Matthew 7:24-27',
      date: 'May 5, 2025',
      series: 'Back to Basics',
      progress: null,
      icon: <Play size={12} />,
      media: [
        { type: 'slides', label: '18 Slides' },
        { type: 'video', label: 'Video' },
        { type: 'audio', label: 'Audio' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '👥 3,120 views',
        '⏱️ 45 min',
        '💬 31 comments'
      ],
      actions: [
        { icon: <Edit size={14} />, label: 'Edit', primary: true },
        { icon: <Eye size={14} />, label: 'View' },
        { icon: <Calendar size={14} />, label: 'Schedule' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    },
    {
      title: 'The Heart of Worship',
      slideTitle: 'THE HEART OF WORSHIP',
      status: 'Draft',
      scripture: 'John 4:23-24',
      date: 'June 9, 2025',
      series: 'Back to Basics',
      progress: 20,
      icon: <Edit size={12} />,
      description: 'What does it mean to worship God in spirit and in truth? Rediscovering the essence of authentic worship beyond songs and rituals.',
      media: [
        { type: 'slides', label: '3 Slides' },
        { type: 'notes', label: 'Notes' }
      ],
      stats: [
        '📝 20% complete',
        '⏱️ Est. 42 min',
        '💡 Research phase'
      ],
      actions: [
        { icon: <Edit size={14} />, text: 'Continue', label: 'Continue', primary: true },
        { icon: <BookOpen size={14} />, text: 'Research', label: 'Research' },
        { icon: <Save size={14} />, text: 'Save', label: 'Save' },
        { icon: <MoreHorizontal size={14} />, label: 'More' }
      ]
    }
  ];

  // Event handlers
  const handleSearch = (e) => {
    console.log('Searching for:', e.target.value);
  };

  const handleSermonClick = (title) => {
    console.log('Sermon clicked:', title);
  };

  const handleActionClick = (action, e) => {
    e.stopPropagation();
    console.log('Action clicked:', action);
  };

  return (
    <SidebarLayout>
      <div className="header">
        <h1>Your Sermons</h1>
        <p>Manage and organize your sermon library</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <SearchBox 
            placeholder="Search sermons by title, scripture, or topic..."
            onChange={handleSearch}
          />
          <select className="filter-dropdown">
            <option>All Sermons</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <select className="filter-dropdown">
            <option>All Series</option>
            <option>Summer of Hope</option>
            <option>Back to Basics</option>
            <option>Finding Purpose</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary">
            <Upload size={16} /> Import
          </Button>
          <Button variant="primary" className="gradient-button">
            <Sparkles size={16} /> Create New
          </Button>
        </div>
      </div>

      {/* Sermons List */}
      <div className="sermons-list">
        {sermons.map((sermon, index) => (
          <SermonRow
            key={index}
            sermon={sermon}
            onSermonClick={handleSermonClick}
            onActionClick={handleActionClick}
          />
        ))}
      </div>
    </SidebarLayout>
  );
}
