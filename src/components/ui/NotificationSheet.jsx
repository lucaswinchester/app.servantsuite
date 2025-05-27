"use client"

import * as React from "react"
import Button from "./Button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet"
import { Bell, Megaphone, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"

export function NotificationSheet({ children }) {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("notifications")

  // Sample data - replace with your actual data
  const notifications = [
    {
      id: 1,
      title: "New message from Sarah",
      description: "Shared a new document with you",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "Sermon feedback",
      description: "You have 5 new sermon feedback responses",
      time: "1h ago",
      read: true,
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      description: "Scheduled maintenance this Sunday at 2 AM",
      time: "May 25",
    },
    {
      id: 2,
      title: "New Feature: Analytics",
      description: "Check out the new analytics dashboard",
      time: "May 24",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">View notifications</span>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
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
                Notifications
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
                  value="notifications"
                  className="w-full rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
                >
                  Notifications
                  {notifications.some(n => !n.read) && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="announcements"
                  className="w-full rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
                >
                  Announcements
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Add a subtle fade-in animation for content */}
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateX(8px); }
                to { opacity: 1; transform: translateX(0); }
              }
              [data-state="active"] {
                animation: fadeIn 0.2s ease-out forwards;
              }
            `}</style>
            <TabsContent value="notifications" className="m-0">
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-xl transition-all duration-200 ${
                        notification.read 
                          ? 'bg-gray-50/70 dark:bg-gray-800/40 hover:bg-gray-100/70 dark:hover:bg-gray-800/60' 
                          : 'bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-l-4 border-blue-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                          <Bell className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                              {notification.title}
                            </h4>
                            <span className="ml-2 flex-shrink-0 text-xs text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="mt-3 flex justify-end">
                          <button 
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle mark as read
                            }}
                          >
                            Mark as read
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                      <Bell className="h-5 w-5 text-gray-400" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="m-0">
              <div className="space-y-4">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <div 
                      key={announcement.id} 
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 transition-all duration-200 hover:border-gray-200 dark:hover:border-gray-600"
                    >
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                          <Megaphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {announcement.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {announcement.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {announcement.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Megaphone className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No announcements</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
