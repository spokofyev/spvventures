"use client";

import { useRef, useState } from "react";
import Arrow from "./arrow";

const links = [
  ["Context", "#context"],
  ["Projects", "#projects"],
  ["Approach", "#approach"],
  ["Team", "#team"],
  ["Join", "#join"],
  ["Contact", "#contact"],
];

export default function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function close() {
    dialog.current?.close();
    setOpen(false);
  }

  return <>
    <button ref={trigger} className="menu-toggle" type="button" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <span /><span /><span />
    </button>
    <dialog ref={dialog} id="site-menu" className="menu-dialog" aria-label="Site navigation" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="menu-panel">
        <div className="menu-top"><a className="brand" href="#top" onClick={close}>Kulon</a><button type="button" className="menu-close" aria-label="Close menu" onClick={close}><span /><span /></button></div>
        <nav aria-label="Primary navigation">
          {links.map(([label, href], index) => <a href={href} key={href} onClick={close}><span>0{index + 1}</span>{label}</a>)}
        </nav>
        <div className="menu-foot"><span>Berlin / London</span><a className="button" href="mailto:founders@kulon.space" onClick={close}>Start a conversation <Arrow /></a></div>
      </div>
    </dialog>
  </>;
}
