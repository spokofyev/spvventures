"use client";

import { useRef, useState } from "react";

const links = [
  ["Projects", "#projects"],
  ["Approach", "#approach"],
  ["Team", "#team"],
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
        <div className="menu-top"><span>Kulon</span><button type="button" className="menu-close" aria-label="Close menu" onClick={close}>×</button></div>
        <nav aria-label="Primary navigation">
          {links.map(([label, href], index) => <a href={href} key={href} onClick={close}><span>0{index + 1}</span>{label}</a>)}
        </nav>
      </div>
    </dialog>
  </>;
}
