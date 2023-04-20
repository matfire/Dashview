export default function Header() {
  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">DashView</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/settings">Settings</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
