const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[300px] bg-[#F0F4FA]">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default Loading;
