'use client';

import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import SermonCard from '../../components/dashboard/SermonCard';
import SeriesCard from '../../components/dashboard/SeriesCard';
import ActionCard from '../../components/dashboard/ActionCard';
import PageHeader from '../../components/layout/PageHeader';
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
import { auth } from '@clerk/nextjs/server'
import { getUserOrganizations } from '@/lib/db';
import { prisma } from '@/lib/prisma';


export default async function Dashboard() {
  const user = await auth()
  const organizations = await getUserOrganizations(user.userId)

  // Get recent sermons for user's organizations
  const recentSermons = await prisma.sermon.findMany({
    where: {
      organizationId: {
        in: organizations.map(org => org.organizationId),
      },
    },
    include: {
      series: true,
      organization: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 5,
  })

  return (
    <>
      {/* Top Bar */}
      <PageHeader title={`Good morning, <span class="bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] bg-clip-text text-transparent">Pastor John</span>! ✨`} subtitle="Ready to inspire your congregation today?" />

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
    </>
  );
}
