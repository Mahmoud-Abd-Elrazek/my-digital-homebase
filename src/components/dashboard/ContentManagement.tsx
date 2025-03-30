
import React from 'react';
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

interface ContentManagementProps {
  content: ContentItem[];
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
}

const ContentManagement = ({ content, setContent }: ContentManagementProps) => {
  const { toast } = useToast();

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

  const updateContentItem = (id: string, updatedData: Partial<ContentItem>) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
    
    toast({
      title: "Content updated",
      description: "Your content has been successfully updated.",
    });
  };

  const deleteContentItem = (id: string) => {
    setContent(content.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The content item has been removed.",
    });
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ContentManagement;
