const Footer = () => {
  return (
    <footer className="bg-tertiary text-white py-4">
      <div className="container mx-auto px-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
