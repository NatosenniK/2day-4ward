import SiteLogo from "./site-logo";

export function HeaderElement() {
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-4 bg-black border-b border-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <SiteLogo />

          <div className="flex items-center lg:order-1">
            <div className="xl:hidden"></div>
          </div>
          <div
            className="hidden justify-between items-center w-full xl:flex xl:w-auto lg:order-2"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
}
