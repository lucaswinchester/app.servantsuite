"use client";

import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBox from '../../components/ui/SearchBox';
import Button from '@/components/ui/Button';
import SeriesRow from '../../components/series/SeriesRow';
import { Plus, BookOpen, MessageSquare, RefreshCw } from 'lucide-react';

export default function SeriesPage() {
  // Sample series data
  const [series, setSeries] = useState([
    {
      id: 1,
      title: 'Summer of Hope',
      description: 'A series exploring the hope we have in Christ through difficult seasons.',
      sermonCount: 5,
      status: 'Active',
      dateRange: 'May - July 2025',
      commentCount: 12,
      gradient: ['#ff6b6b', '#ffa36b'],
      actions: [
        { icon: <BookOpen size={16} />, label: 'View Series' },
        { icon: <MessageSquare size={16} />, label: 'View Comments' },
      ]
    },
    {
      id: 2,
      title: 'Back to Basics',
      description: 'Rediscovering the foundational truths of our faith and what it means to follow Jesus.',
      sermonCount: 8,
      status: 'Completed',
      dateRange: 'Jan - Apr 2025',
      commentCount: 24,
      gradient: ['#6b8cff', '#6bc6ff'],
      actions: [
        { icon: <BookOpen size={16} />, label: 'View Series' },
        { icon: <MessageSquare size={16} />, label: 'View Comments' },
      ]
    },
    {
      id: 3,
      title: 'The Beatitudes',
      description: 'A deep dive into Jesus\'s Sermon on the Mount and the path to true blessedness.',
      sermonCount: 9,
      status: 'Planned',
      dateRange: 'Aug - Oct 2025',
      commentCount: 0,
      gradient: ['#8e6bff', '#c86bff'],
      actions: [
        { icon: <BookOpen size={16} />, label: 'View Series' },
        { icon: <MessageSquare size={16} />, label: 'View Comments' },
      ]
    }
  ]);

  // Search handler
  const handleSearch = (e) => {
    console.log('Searching for:', e.target.value);
  };

  // Series click handler
  const handleSeriesClick = (title) => {
    console.log('Series clicked:', title);
  };

  // Action click handler
  const handleActionClick = (action, e) => {
    e.stopPropagation();
    console.log('Action clicked:', action);
  };

  return (
    <>
      <PageHeader 
        title={
          <>
            Sermon Series{' '}
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">
              Library
            </span>{' '}
            📚
          </>
        } 
        subtitle="Create and manage your sermon series to deliver powerful, connected messages" 
      />

      {/* Toolbar */}
      <div className="toolbar flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <SearchBox 
            placeholder="Search series by title, topic, or scripture..."
            onChange={handleSearch}
            className="w-full sm:w-64"
          />
          <div className="relative">
            <select className="w-full pl-4 pr-10 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent cursor-pointer appearance-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Planned</option>
              <option>Completed</option>
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
              <option>The Beatitudes</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="primary" className="gradient-button">
            <Plus size={16} className="mr-1.5" />
            New Series
          </Button>
        </div>
      </div>

      {/* Series List */}
      <div className="sermons-list space-y-4">
        {series.map((seriesItem) => (
          <SeriesRow
            key={seriesItem.id}
            series={seriesItem}
            onSeriesClick={handleSeriesClick}
            onActionClick={handleActionClick}
          />
        ))}
      </div>

      {/* Empty State */}
      {series.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No series found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Get started by creating your first sermon series.
          </p>
          <div className="mt-6">
            <Button variant="primary">
              <Plus size={16} className="mr-2" />
              Create New Series
            </Button>
          </div>
        </div>
      )}
    </>
  );
}