import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LayoutDashboard, 
  FileText, 
  ImageIcon, 
  Menu, 
  X,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setSettings({
      siteName: formData.get('siteName') as string || settings.siteName,
      siteDescription: formData.get('siteDescription') as string || settings.siteDescription,
      homeTitle: formData.get('homeTitle') as string || settings.homeTitle,
      homeSubtitle: formData.get('homeSubtitle') as string || settings.homeSubtitle,
      contactEmail: formData.get('contactEmail') as string || settings.contactEmail
    });
    
    toast({
      title: "Settings saved",
      description: "Your website settings have been updated.",
    });
  };

  const updateContentItem = (id: string, updatedData: Partial<ContentItem>) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
    
    toast({
      title: "Content updated",
      description: "Your content has been successfully updated.",
    });
  };

  const createContentItem = (type: 'page' | 'post') => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: `New ${type}`,
      content: `This is a new ${type}`,
      createdAt: new Date().toISOString(),
      type
    };
    
    setContent([...content, newItem]);
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} created`,
      description: `A new ${type} has been created.`,
    });
  };

  const deleteContentItem = (id: string) => {
    setContent(content.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The content item has been removed.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboard_authenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const siteStats = [
    { label: "Pages", value: content.filter(item => item.type === 'page').length },
    { label: "Posts", value: content.filter(item => item.type === 'post').length },
    { label: "Images", value: images.length },
    { label: "Last Updated", value: new Date().toLocaleDateString() }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <button 
        className="fixed top-4 left-4 z-40 md:hidden bg-primary text-primary-foreground rounded-md p-2"
        onClick={toggleSidebar}
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
            onClick={() => navigate('/')}
          >
            View Website
          </button>
          
          <button 
            className="w-full p-2 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground rounded-md"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {siteStats.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
                  <h3 className="text-lg font-medium text-muted-foreground">{stat.label}</h3>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <p className="text-muted-foreground">
                Your website is running smoothly. Use the dashboard to manage your content and settings.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Content Management</h2>
              <div className="space-x-2">
                <button 
                  onClick={() => createContentItem('page')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Add Page
                </button>
                <button 
                  onClick={() => createContentItem('post')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Add Post
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.length > 0 ? (
                    content.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="capitalize">{item.type}</TableCell>
                        <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <button 
                            onClick={() => updateContentItem(item.id, { 
                              title: `Updated ${item.title}`, 
                              content: `Updated content for ${item.title}`
                            })}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteContentItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        No content items found. Create a new page or post to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-6">
            <h2 className="text-3xl font-bold">Media Library</h2>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Upload Media</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop files here or click to browse
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="media-upload"
                  onChange={(e) => {
                    toast({
                      title: "Feature is simulated",
                      description: "This demo uses localStorage and can't store actual files.",
                    });
                  }}
                />
                <button
                  onClick={() => document.getElementById('media-upload')?.click()}
                  className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Select Files
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.length > 0 ? (
                images.map((image) => (
                  <div key={image.id} className="bg-card rounded-lg overflow-hidden border">
                    <div className="bg-muted h-40 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <p className="font-medium truncate">{image.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(image.uploadedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No media items found. Upload images to see them here.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-3xl font-bold">Website Settings</h2>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <form onSubmit={handleSettingsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName" 
                    defaultValue={settings.siteName} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    name="siteDescription" 
                    defaultValue={settings.siteDescription} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="homeTitle">Home Page Title</Label>
                  <Input 
                    id="homeTitle" 
                    name="homeTitle" 
                    defaultValue={settings.homeTitle} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="homeSubtitle">Home Page Subtitle</Label>
                  <Input 
                    id="homeSubtitle" 
                    name="homeSubtitle" 
                    defaultValue={settings.homeSubtitle} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email" 
                    defaultValue={settings.contactEmail} 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                >
                  Save Settings
                </button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
