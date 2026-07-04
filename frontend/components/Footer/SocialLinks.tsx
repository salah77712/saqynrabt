import * as React from 'react';

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4 text-slate-400">
      <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
        LD
      </a>
      <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
        TW
      </a>
      <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
        IG
      </a>
      <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
        YT
      </a>
    </div>
  );
}
