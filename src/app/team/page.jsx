'use client';

import { useState } from 'react';
import Head from 'next/head';
import Button from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import PageHeader from '@/components/layout/PageHeader';

export default function TeamManagement() {
  const [activeTab, setActiveTab] = useState('members');

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'active',
      lastActive: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'active',
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Viewer',
      status: 'pending',
      lastActive: '2 days ago'
    }
  ];

  // Roles data with dark mode colors
  const roles = [
    { name: 'Administrator', count: 1, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' },
    { name: 'Editor', count: 3, color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' },
    { name: 'Viewer', count: 5, color: 'bg-gray-100 dark:bg-gray-700/30 text-gray-800 dark:text-gray-300' },
  ];

  // Pending invites data
  const pendingInvites = [
    { email: 'alex@example.com', role: 'Editor', sent: '2 days ago' },
    { email: 'sarah@example.com', role: 'Viewer', sent: '1 day ago' },
  ];

  // Render tab content functions
  const renderMembersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Team Members</h2>
        <Button>Invite Team Member</Button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/70 overflow-hidden shadow-sm dark:shadow-gray-900/20">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{member.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
              <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                {member.role}
              </span>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></span>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Last active {member.lastActive}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render roles tab
  const renderRolesTab = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Roles & Permissions</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {roles.map((role, i) => {
          const colorMap = {
            'Administrator': {
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              text: 'text-blue-700 dark:text-blue-300',
              border: 'border-blue-100 dark:border-blue-800/50'
            },
            'Editor': {
              bg: 'bg-green-50 dark:bg-green-900/20',
              text: 'text-green-700 dark:text-green-300',
              border: 'border-green-100 dark:border-green-800/50'
            },
            'Viewer': {
              bg: 'bg-gray-50 dark:bg-gray-800/30',
              text: 'text-gray-700 dark:text-gray-300',
              border: 'border-gray-100 dark:border-gray-700/50'
            }
          };
          const colors = colorMap[role.name] || colorMap['Viewer'];
          
          return (
            <div 
              key={i} 
              className={`border ${colors.border} rounded-xl p-5 hover:shadow-md dark:hover:shadow-gray-800/30 transition-all ${colors.bg} group`}
            >
              <div className="flex justify-between items-start">
                <h3 className={`font-medium text-lg ${colors.text}`}>
                  {role.name}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {role.count} {role.count === 1 ? 'member' : 'members'}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {role.name === 'Administrator' && 'Full access to all features and settings'}
                {role.name === 'Editor' && 'Can create and edit content, manage media'}
                {role.name === 'Viewer' && 'Can view content but cannot make changes'}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  View permissions →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render invites tab
  const renderInvitesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Pending Invitations</h2>
        <Button variant="outline">Resend All</Button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700/70 overflow-hidden shadow-sm dark:shadow-gray-900/20">
        {pendingInvites.map((invite, i) => (
          <div 
            key={i} 
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
          >
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">{invite.email}</p>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {invite.role}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Invited {invite.sent}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full sm:w-auto justify-center"
              >
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Resend
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300 w-full sm:w-auto justify-center"
              >
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Team Management | ServantSuite</title>
      </Head>
      <PageHeader 
        title={
          <>
            The{' '}
            <span className="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">
              Servant Squad
            </span>
            !
          </>
        } 
        subtitle="Manage your team members and their permissions" 
      />
      <div className="space-y-8">
        <Tabs 
          defaultValue="members" 
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            {renderMembersTab()}
          </TabsContent>
          
          <TabsContent value="roles">
            {renderRolesTab()}
          </TabsContent>
          
          <TabsContent value="invites">
            {renderInvitesTab()}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};