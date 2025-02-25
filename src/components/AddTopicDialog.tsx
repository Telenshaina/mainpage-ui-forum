import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,

  } from "../components/ui/dialog";
  import { Button } from "../components/ui/button";
  import { Plus } from "lucide-react";
  import { useState } from "react";
  
  export function AddTopicDialog() {
    const [isOpen, setIsOpen] = useState(false);
    console.log("Rendering AddTopicDialog"); // Debug log
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button 
        className="w-full text-white p-4 bg-gradient-to-r from-[#BCB5DD] to-[#B0D4D2] hover:from-[#B0D4D2] hover:to-[#BCB5DD]"
         onClick={() => setIsOpen(true)}
        >
        <Plus className="mr-2" size={20} />
         Add New Topic
        </Button>



        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Topic</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new topic.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter topic title"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter topic description"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Topic
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }