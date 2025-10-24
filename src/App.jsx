function App() {
    // Initialize IndexedDB on app startup
    useEffect(() => {
      initDB().catch((error) => {
        console.error("Failed to initialize IndexedDB:", error);
      });
    }, []);

    return (
      <HelmetProvider>
        <ThemeProvider>
          <div className="app-wrapper">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/security-advice" element={<SecurityAdvice />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/gdpr" element={<GDPR />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/two-factor-verify" element={<TwoFactorVerify />} />
                <Route path="*" element={<NotFound />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/extension-link" element={<ExtensionLink />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </HelmetProvider>
    );
  }

  export default App;