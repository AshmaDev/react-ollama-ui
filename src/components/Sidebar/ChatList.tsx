const ChatList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {/* Example Chat List Item */}
      <div className="bg-gray-700 p-3 rounded hover:bg-gray-600 cursor-pointer">
        Chat 1
      </div>
      <div className="bg-gray-700 p-3 rounded hover:bg-gray-600 cursor-pointer">
        Chat 2
      </div>
      {/* Add more chat items here */}
    </div>
  );
};

export default ChatList;
