import type { ReactNode } from "react";

// Renders the markdown-lite used in content/blog: blank line = new paragraph,
// "## " = sub-heading, "- " = bullet, **bold**, [text](https://url). Nothing else.

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={`${keyPrefix}-b${i++}`} style={{ color: "#0B1F66", fontWeight: 700 }}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const external = href.startsWith("http");
      out.push(
        <a key={`${keyPrefix}-a${i++}`} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ color: "#124AF0", fontWeight: 600, textDecoration: "underline" }}>
          {m[2]}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function BlogBody({ body }: { body: string }) {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="blog-body">
      {blocks.map((block, bi) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={bi} style={{ fontSize: "1.3rem", fontWeight: 800, color: "#124AF0", margin: "34px 0 14px", lineHeight: 1.4 }}>
              {renderInline(block.slice(3), `h${bi}`)}
            </h2>
          );
        }
        const lines = block.split("\n");
        return (
          <p key={bi} style={{ margin: "0 0 14px", fontSize: "1.08rem", lineHeight: 1.9, color: "#2B2B2B" }}>
            {lines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {renderInline(line.startsWith("- ") ? "• " + line.slice(2) : line, `p${bi}-${li}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
