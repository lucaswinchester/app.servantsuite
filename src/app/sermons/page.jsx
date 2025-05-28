'use client';

import React from 'react';
import SermonRow from '../../components/sermons/SermonRow';
import SearchBox from '../../components/ui/SearchBox';
import Button from '@/components/ui/Button';
import PageHeader from '../../components/layout/PageHeader';
import {
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
      serviceType: 'Sunday Morning',
      sermonService: 'Main Service',
      commentCount: 23,
      duration: '42 min',
      viewCount: 2450,
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
      serviceType: 'Sunday Morning',
      sermonService: 'Main Service',
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
      serviceType: 'Sunday Morning',
      sermonService: 'Main Service',
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
      serviceType: 'Sunday Evening',
      sermonService: 'Evening Service',
      commentCount: 0,
      duration: '40 min',
      viewCount: 0,
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
      serviceType: 'Sunday Morning',
      sermonService: 'Main Service',
      commentCount: 31,
      duration: '45 min',
      viewCount: 3120,
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
      serviceType: 'Wednesday',
      sermonService: 'Bible Study',
      commentCount: 0,
      duration: 'Est. 42 min',
      viewCount: 0,
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
    <div className="sermons-page">
      <PageHeader 
        title={
          <>
            Preach it, <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">Pastor</span>! 🎙️✨
          </>
        } 
        subtitle="Craft, organize, and share your messages with the world. Every word matters!" 
      />

      {/* Toolbar */}
      <div className="toolbar flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <SearchBox 
            placeholder="Search sermons by title, scripture, or topic..."
            onChange={handleSearch}
            className="w-full sm:w-64"
          />
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent cursor-pointer appearance-none">
              <option>All Sermons</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Scheduled</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent cursor-pointer appearance-none">
              <option>All Series</option>
              <option>Summer of Hope</option>
              <option>Back to Basics</option>
              <option>Finding Purpose</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
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
    </div>
  );
}
