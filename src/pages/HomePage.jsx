const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to FarmTool</h1>
      <img src="/path-to-your-image.jpg" alt="Farm Image" className="mb-6" />
      <div>
        <a href="/login" className="btn">Login</a>
        <a href="/signup" className="btn ml-4">Signup</a>
      </div>
    </div>
  );
};

export default HomePage;
