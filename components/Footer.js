const navigation = [
  { name: "About", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Terms and Conditions", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#a7c0a7]">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          {navigation.map((item, i) => (
            <div className="px-6 py-2" key={i}>
              <a
                href={item.href}
                className="text-black hover:text-secondary-color"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-black">
          &copy; 2022 Hygge Home Furniture, All right reserved.
        </p>
      </div>
    </footer>
  );
}
