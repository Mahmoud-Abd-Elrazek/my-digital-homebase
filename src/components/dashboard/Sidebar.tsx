
import React from 'react';
import { 
  Settings, 
  LayoutDashboard, 
  FileText, 
  ImageIcon,
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleLogout: () => void;
  navigateToHome: () => void;
}

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab,
  handleLogout,
  navigateToHome 
}: SidebarProps) => {
  return (
    <>
      <button 
        className="fixed top-4 left-4 z-40 md:hidden bg-primary text-primary-foreground rounded-md p-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-card transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:sticky md:top-0 md:h-screen flex flex-col border-r`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Website Dashboard</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            className={`flex items-center w-full p-3 rounded-md ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            <span>Overview</span>
            <ChevronRight className="ml-auto h-5 w-5" />
          </button>
          
          <button 
            className={`flex items-center w-full p-3 rounded-md ${activeTab === 'content' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab("content")}
          >
            <FileText className="mr-2 h-5 w-5" />
            <span>Content</span>
            <ChevronRight className="ml-auto h-5 w-5" />
          </button>
          
          <button 
            className={`flex items-center w-full p-3 rounded-md ${activeTab === 'media' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab("media")}
          >
            <ImageIcon className="mr-2 h-5 w-5" />
            <span>Media</span>
            <ChevronRight className="ml-auto h-5 w-5" />
          </button>
          
          <button 
            className={`flex items-center w-full p-3 rounded-md ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            <span>Settings</span>
            <ChevronRight className="ml-auto h-5 w-5" />
          </button>
        </nav>
        
        <div className="p-4 border-t space-y-2">
          <button 
            className="w-full p-2 bg-primary text-primary-foreground rounded-md"
            onClick={navigateToHome}
          >
            View Website
          </button>
          
          <button 
            className="w-full p-2 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground rounded-md"
            onClick={handleLogout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
