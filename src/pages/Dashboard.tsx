
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ContentManagement from '@/components/dashboard/ContentManagement';
import MediaLibrary from '@/components/dashboard/MediaLibrary';
import SiteSettingsComponent from '@/components/dashboard/SiteSettings';

// Types
interface ContentItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  type: 'page' | 'post';
}

interface ImageItem {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  homeTitle: string;
  homeSubtitle: string;
  contactEmail: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "My Website",
    siteDescription: "A personal portfolio website",
    homeTitle: "Welcome to my website",
    homeSubtitle: "Discover my projects and experience",
    contactEmail: "contact@example.com"
  });

  useEffect(() => {
    const storedContent = localStorage.getItem('dashboard_content');
    const storedImages = localStorage.getItem('dashboard_images');
    const storedSettings = localStorage.getItem('dashboard_settings');
    
    if (storedContent) setContent(JSON.parse(storedContent));
    if (storedImages) setImages(JSON.parse(storedImages));
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard_content', JSON.stringify(content));
    localStorage.setItem('dashboard_images', JSON.stringify(images));
    localStorage.setItem('dashboard_settings', JSON.stringify(settings));
  }, [content, images, settings]);

  const handleLogout = () => {
    localStorage.removeItem("dashboard_authenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const navigateToHome = () => navigate('/');

  const siteStats = [
    { label: "Pages", value: content.filter(item => item.type === 'page').length },
    { label: "Posts", value: content.filter(item => item.type === 'post').length },
    { label: "Images", value: images.length },
    { label: "Last Updated", value: new Date().toLocaleDateString() }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        navigateToHome={navigateToHome}
      />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DashboardOverview siteStats={siteStats} />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentManagement content={content} setContent={setContent} />
          </TabsContent>
          
          <TabsContent value="media">
            <MediaLibrary images={images} />
          </TabsContent>
          
          <TabsContent value="settings">
            <SiteSettingsComponent settings={settings} setSettings={setSettings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
