
import { Bell, MessageSquare, HelpCircle } from 'lucide-react';
import { NotificationSheet } from '@/components/ui/NotificationSheet';
import { MentionsSheet } from '@/components/ui/MentionsSheet';

export default function PageHeader({ title, subtitle, className = '' }) {
  const renderContent = (content) => {
    if (typeof content === 'string' && content.includes('</')) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {renderContent(title)}
        </h1>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {renderContent(subtitle)}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <NotificationSheet>
          <button 
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-gradient-to-r from-[#ff6b6b] to-[#ffa36b] text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </NotificationSheet>
        
        <MentionsSheet>
          <button 
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            title="Messages"
          >
            <MessageSquare size={20} />
            <span className="absolute top-1 right-1 h-4 w-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[10px] rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </MentionsSheet>
      </div>
    </div>
  );
}