import { MessageSquare, ThumbsUp, ThumbsDown, User, Bot, Bookmark, CheckCircle, AlertCircle } from "lucide-react";
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
}

const ProfessorPostView = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Doe",
      content: "The university is too big to navigate",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Dr. Jane Smith",
      content: "Great post! I often get lost too. CICS is already on 415",
      timestamp: "1 hour ago",
      isProfessor: true,
      isVerified: true
    },
    {
      id: 3,
      author: "Mike Johnson",
      content: "Could you elaborate more on the second point?",
      timestamp: "30 minutes ago"
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [votes, setVotes] = useState({ upvotes: 42, downvotes: 5 });
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'flagged' | null>(null);
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "Dr. Professor Name",
      content: newComment,
      timestamp: "Just now",
      isProfessor: true,
      isVerified: true
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
    
    toast({
      title: "Professor Comment Added",
      description: "Your comment has been successfully added to the discussion.",
    });
  };
  
  const handleVote = (type: 'up' | 'down') => {
    // If user already voted the same way, remove their vote
    if (userVote === type) {
      setVotes({
        upvotes: type === 'up' ? votes.upvotes - 1 : votes.upvotes,
        downvotes: type === 'down' ? votes.downvotes - 1 : votes.downvotes
      });
      setUserVote(null);
      return;
    }
    
    // If changing vote from up to down or vice versa
    if (userVote !== null) {
      setVotes({
        upvotes: type === 'up' ? votes.upvotes + 1 : votes.upvotes - 1,
        downvotes: type === 'down' ? votes.downvotes + 1 : votes.downvotes - 1
      });
    } else {
      // New vote
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
  
  const handleVerify = (status: 'verified' | 'flagged') => {
    setVerificationStatus(status);
    
    toast({
      title: status === 'verified' ? "Content Verified" : "Content Flagged",
      description: status === 'verified' 
        ? "You've marked this content as verified." 
        : "You've flagged this content for review.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="text-gray-500" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Alex Thompson</h3>
            <p className="text-sm text-gray-500">Posted 3 hours ago</p>
          </div>
        </div>
        
        {/* Bookmark button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBookmark}
          className={`${bookmarked ? 'text-primary' : 'text-gray-400'}`}
        >
          <Bookmark size={20} />
        </Button>
      </div>

      {/* Post Content */}
<div className="mb-8">
  <div className="flex justify-between items-start mb-4">
    <h2 className="text-xl font-semibold text-justify">
      How do I get to the CICS Department from the Professional Schools Building
    </h2>
    
    {/* Verification badges - Only shown for professors */}
    <div className="flex space-x-2">
      <Button 
        variant={verificationStatus === 'verified' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => handleVerify('verified')}
        className="flex items-center space-x-1"
      >
        <CheckCircle size={16} />
        <span>Verify</span>
      </Button>
      <Button 
        variant={verificationStatus === 'flagged' ? 'destructive' : 'outline'} 
        size="sm"
        onClick={() => handleVerify('flagged')}
        className="flex items-center space-x-1"
      >
        <AlertCircle size={16} />
        <span>Flag</span>
      </Button>
    </div>
    
    {/* Display verification status if professor has verified */}
    {verificationStatus && (
      <div className={`ml-auto flex items-center space-x-1 text-sm px-2 py-1 rounded-full ${
        verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {verificationStatus === 'verified' ? (
          <>
            <CheckCircle size={14} />
            <span>Verified by Professor</span>
          </>
        ) : (
          <>
            <AlertCircle size={14} />
            <span>Flagged for Review</span>
          </>
        )}
      </div>
    )}
  </div>
  
  <p className="text-gray-700 mb-4 text-justify">
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
  <p className="text-blue-800 text-sm text-justify">
    Based on the topic, here's a helpful starting point: From the Professionals Schools Building (PSB) you can go to the main building through the Integrated School Building or in Tala Street!
    CICS Department is on the 4th Floor of the main building (415).
  </p>
</div>


      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold mb-4">Comments</h4>
        
        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            placeholder="Add a professor comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">

              Post Professor Comment
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
                  : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                    {comment.isProfessor && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Professor
                      </span>
                    )}
                    {comment.isVerified && (
                      <span className="ml-2 text-green-600">
                        <CheckCircle size={14} />
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorPostView;