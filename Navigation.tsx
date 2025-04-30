interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

function NavLink({ href, icon, text }: NavLinkProps) {
  return (
    <a 
      href={href}
      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

export default function Navigation() {
  return (
    <nav className="flex space-x-6">
      <NavLink href="/" icon={<span>🏠</span>} text="Home" />
      <NavLink href="/predict" icon={<span>🔮</span>} text="Predict" />
      <NavLink href="/chat" icon={<span>💬</span>} text="Chat" />
    </nav>
  );
}