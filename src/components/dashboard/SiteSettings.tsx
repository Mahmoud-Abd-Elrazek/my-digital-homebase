
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  homeTitle: string;
  homeSubtitle: string;
  contactEmail: string;
}

interface SiteSettingsProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const SiteSettingsComponent = ({ settings, setSettings }: SiteSettingsProps) => {
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default SiteSettingsComponent;
