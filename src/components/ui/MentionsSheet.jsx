"use client"

import * as React from "react"
import Button from "./Button"
import { Sheet, SheetContent, SheetTrigger } from "./Sheet"
import { MessageSquare, CheckCircle2, Clock, AlertCircle, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { SheetTitle } from "./Sheet"

export function MentionsSheet({ children }) {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("mentions")
  const [replyTo, setReplyTo] = React.useState(null)
  const [replyText, setReplyText] = React.useState("")

  // Sample data - replace with actual data from your API
  const mentions = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      message: "Can you review the sermon slides for Sunday? I've made some updates based on last week's feedback.",
      time: "10m ago",
      type: "request",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "MC",
      message: "The baptism registration form is ready for your approval. We have 12 sign-ups so far.",
      time: "1h ago",
      type: "approval",
      status: "awaiting",
      priority: "medium"
    },
    {
      id: 3,
      user: "Pastor Williams",
      avatar: "PW",
      message: "Great job on the youth retreat! The parents have been sending positive feedback.",
      time: "3h ago",
      type: "message",
      status: "read",
      priority: "low"
    },
  ]

  const tasks = [
    {
      id: 1,
      title: "Review budget proposal",
      assignedBy: "Finance Team",
      dueDate: "Today, 5:00 PM",
      status: "in-progress",
      priority: "high"
    },
    {
      id: 2,
      title: "Schedule volunteer training",
      assignedBy: "Volunteer Coordinator",
      dueDate: "Tomorrow, 12:00 PM",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      title: "Order supplies for VBS",
      assignedBy: "Children's Ministry",
      dueDate: "Friday",
      status: "pending",
      priority: "high"
    },
  ]

  const handleReply = (mention) => {
    setReplyTo(mention)
  }

  const handleSendReply = () => {
    // Handle sending reply
    console.log("Replying to:", replyTo.user, "with:", replyText)
    setReplyTo(null)
    setReplyText("")
  }

  const handleTaskStatusChange = (taskId, newStatus) => {
    // Handle task status update
    console.log(`Updating task ${taskId} status to ${newStatus}`)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />
      case 'awaiting':
        return <Clock className="h-4 w-4 text-purple-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    }
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${styles[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">View mentions</span>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 [&>button]:hidden flex flex-col"
      >
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Mentions & Tasks
              </SheetTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-1 h-9">
                <TabsTrigger 
                  value="mentions"
                  className="w-full rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
                >
                  Mentions
                  {mentions.some(m => m.status !== 'read') && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                      {mentions.filter(m => m.status !== 'read').length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks"
                  className="w-full rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
                >
                  My Tasks
                  {tasks.some(t => t.status !== 'completed') && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-medium text-white">
                      {tasks.filter(t => t.status !== 'completed').length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <TabsContent value="mentions" className="m-0 space-y-4">
              {mentions.map((mention) => (
                <div 
                  key={mention.id} 
                  className={`p-4 rounded-xl transition-all duration-200 ${
                    mention.status === 'read' 
                      ? 'bg-gray-50/70 dark:bg-gray-800/40 hover:bg-gray-100/70 dark:hover:bg-gray-800/60' 
                      : 'bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 font-medium text-sm">
                      {mention.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {mention.user}
                        </h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(mention.status)}
                          <span className="text-xs text-gray-400">
                            {mention.time}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {mention.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        {getPriorityBadge(mention.priority)}
                        <div className="flex space-x-2">
                          <button 
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            onClick={() => handleReply(mention)}
                          >
                            Reply
                          </button>
                          <button 
                            className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                            onClick={() => console.log("Marking as read:", mention.id)}
                          >
                            Mark as read
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="tasks" className="m-0 space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={() => handleTaskStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        className="mt-0.5"
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </button>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                          Assigned by {task.assignedBy} · Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                        onClick={() => console.log("View details:", task.id)}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Details
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        onClick={() => console.log("Snooze:", task.id)}
                      >
                        Snooze
                      </button>
                      <button 
                        className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                        onClick={() => console.log("Delegate:", task.id)}
                      >
                        Delegate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </div>
        </Tabs>

        {/* Reply Composer */}
        {replyTo && (
          <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Replying to <span className="font-medium text-gray-900 dark:text-white">{replyTo.user}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              />
              <button 
                onClick={handleSendReply}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={!replyText.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
