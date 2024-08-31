import Header from "../components/Header";
import Footer from "../components/Footer";

function DummyPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
    // window.location.reload();
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage: "url(src/assets/background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>Welcome to the Dummy Page</h1>
        <button
          type="button"
          className="flex mt-3 justify-center bg-black text-white p-2 rounded-md hover:bg-yellow-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default DummyPage;
