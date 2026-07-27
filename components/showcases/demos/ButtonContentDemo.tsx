"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CopyIcon } from "@phosphor-icons/react/dist/csr/Copy";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/public/Button";

export default function ButtonContentDemo() {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText("Button.Content");
    } catch {
      return;
    }

    setCopied(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimeoutRef.current = null;
    }, 1600);
  }

  return (
    <Button
      className="gap-1.5"
      variant="secondary"
      type="button"
      onClick={handleCopy}
    >
      <Button.Content state={copied ? "copied" : "idle"}>
        {copied ? (
          <>
            <CheckCircleIcon
              className="text-green-9"
              size={16}
              weight="fill"
              aria-hidden="true"
            />
            <span className="sr-only">Copied</span>
          </>
        ) : (
          <CopyIcon size={16} weight="bold" aria-hidden="true" />
        )}
      </Button.Content>
      Copy
    </Button>
  );
}
