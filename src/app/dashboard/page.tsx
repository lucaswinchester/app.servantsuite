// app/dashboard/page.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/Button'
import { CalendarDays, Users, FileText, CheckSquare, Bell } from 'lucide-react'

// Types based on your Prisma schema
interface Organization {
  id: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
}

interface OrganizationMembership {
  id: string
  role: 'admin' | 'pastor' | 'tech_director' | 'media_team' | 'volunteer'
  organization: Organization
}

interface Sermon {
  id: string
  title: string
  description: string | null
  date: string
  speaker: string | null
  status: string
  series: {
    id: string
    title: string
  } | null
  organization: {
    name: string
  }
}

interface Task {
  id: string
  title: string
  description: string | null
  priority: string
  status: string
  dueDate: string | null
  assignedTo: string | null
}

interface Announcement {
  id: string
  title: string
  content: string
  priority: string
  isPinned: boolean
  createdAt: string
  creator: {
    firstName: string | null
    lastName: string | null
  }
}

interface DashboardStats {
  totalSermons: number
  upcomingServices: number
  pendingTasks: number
  totalAssets: number
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State for dashboard data
  const [organizations, setOrganizations] = useState<OrganizationMembership[]>([])
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null)
  const [recentSermons, setRecentSermons] = useState<Sermon[]>([])
  const [myTasks, setMyTasks] = useState<Task[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalSermons: 0,
    upcomingServices: 0,
    pendingTasks: 0,
    totalAssets: 0,
  })

  // Fetch user's organizations
  useEffect(() => {
    if (isLoaded && user) {
      fetchUserOrganizations()
    }
  }, [isLoaded, user])

  // Fetch organization-specific data when org is selected
  useEffect(() => {
    if (selectedOrgId) {
      fetchDashboardData()
    }
  }, [selectedOrgId])

  const fetchUserOrganizations = async () => {
    try {
      const response = await fetch('/api/user/organizations')
      
      if (!response.ok) {
        throw new Error('Failed to fetch organizations')
      }

      const data = await response.json()
      setOrganizations(data.organizations)
      
      // Auto-select first organization
      if (data.organizations.length > 0) {
        setSelectedOrgId(data.organizations[0].organization.id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboardData = async () => {
    if (!selectedOrgId) return

    setLoading(true)
    try {
      // Fetch all dashboard data in parallel
      const [sermonsRes, tasksRes, announcementsRes, statsRes] = await Promise.all([
        fetch(`/api/organizations/${selectedOrgId}/sermons?limit=5`),
        fetch(`/api/organizations/${selectedOrgId}/tasks/my-tasks`),
        fetch(`/api/organizations/${selectedOrgId}/announcements?limit=3`),
        fetch(`/api/organizations/${selectedOrgId}/stats`),
      ])

      if (!sermonsRes.ok || !tasksRes.ok || !announcementsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const [sermonsData, tasksData, announcementsData, statsData] = await Promise.all([
        sermonsRes.json(),
        tasksRes.json(),
        announcementsRes.json(),
        statsRes.json(),
      ])

      setRecentSermons(sermonsData.sermons)
      setMyTasks(tasksData.tasks)
      setAnnouncements(announcementsData.announcements)
      setStats(statsData.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'pastor':
        return 'bg-purple-100 text-purple-800'
      case 'tech_director':
        return 'bg-blue-100 text-blue-800'
      case 'media_team':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600'
      case 'high':
        return 'text-orange-600'
      case 'normal':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (organizations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You're not a member of any organizations yet.</p>
            <Button className="mt-4">Join an Organization</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedOrg = organizations.find(
    (org) => org.organization.id === selectedOrgId
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your ministry teams.
        </p>
      </div>

      {/* Organization Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Organization
        </label>
        <select
          value={selectedOrgId || ''}
          onChange={(e) => setSelectedOrgId(e.target.value)}
          className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {organizations.map((membership) => (
            <option key={membership.organization.id} value={membership.organization.id}>
              {membership.organization.name}
            </option>
          ))}
        </select>
        {selectedOrg && (
          <Badge className={`mt-2 ${getRoleBadgeColor(selectedOrg.role)}`}>
            {selectedOrg.role.replace('_', ' ').toUpperCase()}
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sermons</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSermons}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Services</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingServices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssets}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sermons */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Sermons</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSermons.length === 0 ? (
              <p className="text-gray-500">No sermons found.</p>
            ) : (
              <div className="space-y-4">
                {recentSermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{sermon.title}</h3>
                        {sermon.series && (
                          <p className="text-sm text-gray-600">
                            Series: {sermon.series.title}
                          </p>
                        )}
                        {sermon.description && (
                          <p className="text-sm text-gray-700 mt-1">
                            {sermon.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{formatDate(sermon.date)}</span>
                          {sermon.speaker && <span>Speaker: {sermon.speaker}</span>}
                          <Badge variant="outline">{sermon.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {myTasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned.</p>
              ) : (
                <div className="space-y-3">
                  {myTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="border-b pb-2 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          {task.description && (
                            <p className="text-xs text-gray-600 mt-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={getPriorityColor(task.priority)}
                            >
                              {task.priority}
                            </Badge>
                            <Badge variant="outline">{task.status}</Badge>
                          </div>
                          {task.dueDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Due: {formatDate(task.dueDate)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {announcements.length === 0 ? (
                <p className="text-gray-500">No announcements.</p>
              ) : (
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`p-3 rounded-lg border ${
                        announcement.isPinned
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(announcement.priority)}
                        >
                          {announcement.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        {announcement.content}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          By {announcement.creator.firstName} {announcement.creator.lastName}
                        </span>
                        <span>{formatDate(announcement.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
