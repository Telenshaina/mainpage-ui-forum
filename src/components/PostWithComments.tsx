
import { MessageSquare, ThumbsUp, User, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const PostWithComments = () => {
  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: "John Doe",
      content: "The university is too big to navigate",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "Great post! I often get lost too. CICS is already on 415",
      timestamp: "1 hour ago"
    },
    {
      id: 3,
      author: "Mike Johnson",
      content: "Could you elaborate more on the second point?",
      timestamp: "30 minutes ago"
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in">
      {/* Post Header */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="text-gray-500" size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Alex Thompson</h3>
          <p className="text-sm text-gray-500">Posted 3 hours ago</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How do I get to the CICS Department from the Professional Schools Building </h2>
        <p className="text-gray-700 mb-4">
        "Are there any shortcuts or indoor paths I can take in case of bad weather?"
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MessageSquare size={16} />
            <span>{comments.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsUp size={16} />
            <span>42</span>
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
          CICS Department is on the 4th Floor of the main building (415)
        </p>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold mb-4">Comments</h4>
        
        {/* Comment Input */}
        <div className="mb-6">
          <textarea
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 relative pl-6">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100"></div>
              
              {/* Comment Content */}
              <div className="flex-1 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-900">{comment.author}</h5>
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

export default PostWithComments;
