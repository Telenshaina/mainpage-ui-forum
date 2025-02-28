
import { 
    MessageSquare, 
    ThumbsUp, 
    ThumbsDown, 
    User, 
    Bot, 
    Bookmark, 
    Flag, 
    Shield,
    Trash2,
    CheckCircle,
    AlertCircle,
    Edit,
    Send
  } from "lucide-react";
  import { Button } from "../ui/button";
  import { useState } from "react";
  import { toast } from "../../hooks/use-toast";
  
  interface Comment {
    id: number;
    author: string;
    content: string;
    timestamp: string;
    isProfessor?: boolean;
    isVerified?: boolean;
    isFlagged?: boolean;
  }
  
  const AdminPostView = () => {
    const [comments, setComments] = useState<Comment[]>([
      {
        id: 1,
        author: "John Doe",
        content: "The university is too big to navigate",
        timestamp: "2 hours ago",
        isFlagged: false
      },
      {
        id: 2,
        author: "Dr. Jane Smith",
        content: "Great post! I often get lost too. CICS is already on 415",
        timestamp: "1 hour ago",
        isProfessor: true,
        isVerified: true,
        isFlagged: false
      },
      {
        id: 3,
        author: "Mike Johnson",
        content: "Could you elaborate more on the second point?",
        timestamp: "30 minutes ago",
        isFlagged: true
      }
    ]);
    
    const [newComment, setNewComment] = useState("");
    const [newModNote, setNewModNote] = useState("");
    const [bookmarked, setBookmarked] = useState(false);
    const [votes, setVotes] = useState({ upvotes: 42, downvotes: 5 });
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
    const [isFlagged, setIsFlagged] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    
    const handleAddComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;
      
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: "Admin",
        content: newComment,
        timestamp: "Just now",
        isVerified: true
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment("");
      
      toast({
        title: "Comment Added",
        description: "Your comment has been successfully added to the discussion.",
      });
    };
  
    const handleAddModNote = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newModNote.trim()) return;
      
      toast({
        title: "Moderation Note Added",
        description: "Your note has been added to the moderation log.",
      });
      
      setNewModNote("");
    };
    
    const handleVote = (type: 'up' | 'down') => {
      if (userVote === type) {
        setVotes({
          upvotes: type === 'up' ? votes.upvotes - 1 : votes.upvotes,
          downvotes: type === 'down' ? votes.downvotes - 1 : votes.downvotes
        });
        setUserVote(null);
        return;
      }
      
      if (userVote !== null) {
        setVotes({
          upvotes: type === 'up' ? votes.upvotes + 1 : votes.upvotes - 1,
          downvotes: type === 'down' ? votes.downvotes + 1 : votes.downvotes - 1
        });
      } else {
        setVotes({
          upvotes: type === 'up' ? votes.upvotes + 1 : votes.upvotes,
          downvotes: type === 'down' ? votes.downvotes + 1 : votes.downvotes
        });
      }
      
      setUserVote(type);
      
      toast({
        title: type === 'up' ? "Post Upvoted" : "Post Downvoted",
        description: "Your vote has been recorded.",
      });
    };
    
    const handleBookmark = () => {
      setBookmarked(!bookmarked);
      
      toast({
        title: bookmarked ? "Bookmark Removed" : "Post Bookmarked",
        description: bookmarked ? "This post has been removed from your bookmarks." : "This post has been added to your bookmarks.",
      });
    };
  
    const handleFlag = () => {
      setIsFlagged(!isFlagged);
      
      toast({
        title: isFlagged ? "Flag Removed" : "Post Flagged",
        description: isFlagged ? "The flag has been removed from this post." : "This post has been flagged for review.",
      });
    };
  
    const handleVerify = () => {
      setIsVerified(!isVerified);
      
      toast({
        title: isVerified ? "Verification Removed" : "Post Verified",
        description: isVerified ? "Verification has been removed from this post." : "This post has been verified as accurate.",
      });
    };
  
    const handleFlagComment = (id: number) => {
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, isFlagged: !comment.isFlagged } : comment
      ));
      
      const comment = comments.find(c => c.id === id);
      
      toast({
        title: comment?.isFlagged ? "Flag Removed" : "Comment Flagged",
        description: comment?.isFlagged 
          ? "The flag has been removed from this comment." 
          : "This comment has been flagged for review.",
      });
    };
  
    const handleRemoveComment = (id: number) => {
      setComments(comments.filter(comment => comment.id !== id));
      
      toast({
        title: "Comment Removed",
        description: "The comment has been removed from the discussion.",
      });
    };
  
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
        {/* Admin Action Bar */}
        <div className="bg-gray-50 p-3 rounded-lg mb-6 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={isVerified ? "default" : "outline"} 
              size="sm"
              onClick={handleVerify}
              className="flex items-center gap-1"
            >
              <CheckCircle size={16} />
              {isVerified ? "Verified" : "Verify Content"}
            </Button>
            <Button 
              variant={isFlagged ? "destructive" : "outline"} 
              size="sm"
              onClick={handleFlag}
              className="flex items-center gap-1"
            >
              <Flag size={16} />
              {isFlagged ? "Flagged" : "Flag Content"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Edit size={16} />
              Edit Post
            </Button>
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash2 size={16} />
            Remove Post
          </Button>
        </div>
  
        {/* Post Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="text-gray-500" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">Alex Thompson</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Student</span>
                {isVerified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verified</span>
                )}
                {isFlagged && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Flagged</span>
                )}
              </div>
              <p className="text-sm text-gray-500">Posted 3 hours ago</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBookmark}
              className={`${bookmarked ? 'text-primary' : 'text-gray-400'}`}
            >
              <Bookmark size={20} />
            </Button>
          </div>
        </div>
  
        {/* Post Content */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">How do I get to the CICS Department from the Professional Schools Building
            </h2>
          </div>
          
          <p className="text-gray-700 mb-4">
          Are there any shortcuts or indoor paths I can take in case of bad weather?
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MessageSquare size={16} />
              <span>{comments.length}</span>
            </div>
            
            {/* Voting buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleVote('up')}
                className={`flex items-center space-x-1 ${userVote === 'up' ? 'text-green-600' : ''}`}
              >
                <ThumbsUp size={16} />
                <span>{votes.upvotes}</span>
              </button>
              <button 
                onClick={() => handleVote('down')}
                className={`flex items-center space-x-1 ${userVote === 'down' ? 'text-red-600' : ''}`}
              >
                <ThumbsDown size={16} />
                <span>{votes.downvotes}</span>
              </button>
            </div>
          </div>
        </div>
  
        {/* AI Suggestion Box */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="text-blue-600" size={20} />
            <h4 className="font-medium text-blue-900">AI Suggested Answer</h4>
          </div>
          <p className="text-blue-800 text-sm">
                Based on the topic, here's a helpful starting point: From the Professionals Schools Building (PSB) you can go to the main building through the Integrated School Building or in Tala Street!
            CICS Department is on the 4th Floor of the main building (415).
        </p>
        </div>
  
        {/* Moderation Notes Section */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-yellow-600" size={20} />
            <h4 className="font-medium text-yellow-900">Moderation Notes (Admin Only)</h4>
          </div>
          <div className="space-y-3 mb-3">
            <div className="p-3 bg-white rounded border border-yellow-100">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Admin User • 1 hour ago</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Post was flagged by 3 users for potential misinformation. Content has been reviewed and deemed accurate.
              </p>
            </div>
          </div>
          <form onSubmit={handleAddModNote}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add moderation note..."
                value={newModNote}
                onChange={(e) => setNewModNote(e.target.value)}
                className="flex-1 p-2 text-sm border border-yellow-200 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <Button 
                type="submit" 
                size="sm"
                variant="outline"
                className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
              >
                <Send size={14} className="mr-1" />
                Add Note
              </Button>
            </div>
          </form>
        </div>
  
        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-lg font-semibold mb-4">Comments</h4>
          
          {/* Comment Input */}
          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary-hover text-white">
                Post Comment
              </Button>
            </div>
          </form>
  
          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 relative pl-6">
                {/* Vertical Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                
                {/* Comment Content */}
                <div className={`flex-1 rounded-lg p-4 ${
                  comment.isProfessor 
                    ? 'bg-blue-50 border border-blue-200' 
                    : comment.isFlagged
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                      {comment.isProfessor && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Professor
                        </span>
                      )}
                      {comment.isVerified && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                          Verified
                        </span>
                      )}
                      {comment.isFlagged && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Flagged
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  
                  {/* Admin actions for comment */}
                  <div className="mt-3 flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleFlagComment(comment.id)}
                      className={`h-8 ${comment.isFlagged ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      <Flag size={14} className="mr-1" />
                      {comment.isFlagged ? 'Unflag' : 'Flag'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleRemoveComment(comment.id)}
                      className="h-8 text-red-600"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPostView;