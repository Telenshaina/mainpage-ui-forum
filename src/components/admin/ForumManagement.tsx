import { useState } from "react";
import { Button } from "../../components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { 
  MoreHorizontal, 
  ThumbsUp,
  MessageSquare, 
  CheckCircle,
  Flag,
  Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../../components/ui/dropdown-menu";
import { toast } from "../../hooks/use-toast";

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  status: "active" | "flagged" | "removed";
}

export function ForumManagement() {
  const [posts, setPosts] = useState<ForumPost[]>([
    { 
      id: 1, 
      title: "Introduction to the Course", 
      author: "Professor Smith", 
      date: "2023-09-15", 
      likes: 24, 
      comments: 8, 
      status: "active" 
    },
    { 
      id: 2, 
      title: "Question about Assignment #2", 
      author: "Student123", 
      date: "2023-09-18", 
      likes: 5, 
      comments: 12, 
      status: "flagged" 
    },
    { 
      id: 3, 
      title: "Study Group for Midterm", 
      author: "StudyBuddy", 
      date: "2023-09-20", 
      likes: 15, 
      comments: 6, 
      status: "active" 
    },
    { 
      id: 4, 
      title: "Resources for Chapter 5", 
      author: "ResourceGuru", 
      date: "2023-09-22", 
      likes: 18, 
      comments: 3, 
      status: "active" 
    },
    { 
      id: 5, 
      title: "Off-topic discussion", 
      author: "RandomUser", 
      date: "2023-09-23", 
      likes: 2, 
      comments: 4, 
      status: "flagged" 
    },
  ]);

  const [showFlagged, setShowFlagged] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const handleToggleStatus = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const newStatus = post.status === "flagged" ? "active" : 
                         post.status === "active" ? "flagged" : post.status;
        
        toast({
          title: `Post ${newStatus === "active" ? "Approved" : "Flagged"}`,
          description: `The post has been ${newStatus === "active" ? "approved" : "flagged"}.`
        });
        
        return { ...post, status: newStatus };
      }
      return post;
    }));
  };

  const handleRemovePost = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        toast({
          title: "Post Removed",
          description: "The post has been removed from the forum."
        });
        
        return { ...post, status: "removed" };
      }
      return post;
    }));
  };

  const handleToggleSelected = (id: number) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter(postId => postId !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  const handleApproveSelected = () => {
    if (selectedPosts.length === 0) return;
    
    setPosts(posts.map(post => {
      if (selectedPosts.includes(post.id)) {
        return { ...post, status: "active" };
      }
      return post;
    }));
    
    toast({
      title: "Posts Approved",
      description: `${selectedPosts.length} posts have been approved.`
    });
    
    setSelectedPosts([]);
  };

  const filteredPosts = showFlagged 
    ? posts.filter(post => post.status === "flagged")
    : posts.filter(post => post.status !== "removed");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Forum Structure</h2>
        <p className="text-gray-500">Manage forum categories, posts, and permissions.</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-semibold">Forum Posts Management</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFlagged(!showFlagged)}
              className={showFlagged ? "bg-red-50" : ""}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFlagged ? "Show All" : "Show Flagged"}
            </Button>
            <Button 
              size="sm"
              onClick={handleApproveSelected}
              disabled={selectedPosts.length === 0}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Selected
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Post</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell 
                    className="font-medium"
                    onClick={() => handleToggleSelected(post.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleToggleSelected(post.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>{post.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4 text-gray-500" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      post.status === "active" ? "secondary" :
                      post.status === "flagged" ? "destructive" :
                      "outline"
                    }>
                      {post.status === "active" ? "Active" :
                       post.status === "flagged" ? "Flagged" :
                       "Removed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "View Post",
                            description: `Viewing post: ${post.title}`,
                          });
                        }}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(post.id)}>
                          {post.status === "flagged" ? "Approve post" : "Flag post"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRemovePost(post.id)}
                          className="text-red-600"
                        >
                          Remove post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}