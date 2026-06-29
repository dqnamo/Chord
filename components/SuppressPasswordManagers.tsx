"use client";

import { useEffect } from "react";

// Stops password managers (Bitwarden, 1Password, LastPass, Dashlane) from
// injecting overlays/icons onto the showcase inputs. We never touch the
// components themselves — instead we tag every field (including ones rendered
// later into portals, e.g. Combobox/Select popups) with the documented
// per-field opt-out attributes.
const IGNORE_ATTRS: Record<string, string> = {
  "data-1p-ignore": "", // 1Password
  "data-lpignore": "true", // LastPass
  "data-bwignore": "true", // Bitwarden
  "data-form-type": "other", // Dashlane
  "data-protonpass-ignore": "true", // Proton Pass
};

const FIELD_SELECTOR = "input, textarea, select";

function tag(element: Element) {
  for (const [name, value] of Object.entries(IGNORE_ATTRS)) {
    if (!element.hasAttribute(name)) {
      element.setAttribute(name, value);
    }
  }
}

function tagWithin(root: ParentNode) {
  if (root instanceof Element && root.matches(FIELD_SELECTOR)) {
    tag(root);
  }
  for (const field of root.querySelectorAll(FIELD_SELECTOR)) {
    tag(field);
  }
}

export default function SuppressPasswordManagers() {
  useEffect(() => {
    tagWithin(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            tagWithin(node as Element);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
