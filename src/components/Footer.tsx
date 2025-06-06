export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white py-6 text-center text-sm"
      data-testid="footer"
    >
      <p>&copy; 2025 Shiv Shankar Kushwaha. All rights reserved.</p>
      <p>
        <a
          href="https://shivshankar.vercel.app"
          className="underline hover:text-blue-400"
        >
          Portfolio
        </a>{" "}
        |{" "}
        <a
          href="mailto:scriptingshiv@gmail.com"
          className="underline hover:text-blue-400"
          data-testid="footer-contact"
        >
          Contact
        </a>
      </p>
    </footer>
  );
}
