import React, { ReactElement } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
interface LinkType {
  text: string;
  uri: string;
}
interface LinksType {
  links: Array<LinkType>;
}

function Header({ links }: LinksType): ReactElement {
  return (
    <header className="main-header">
      <nav className="header-nav">
        {links.map((link: LinkType, idx: number) => (
          <React.Fragment key={`${idx}-${link.text}`}>
            <Link to={link.uri}>{link.text}</Link>
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
}
export default Header;
