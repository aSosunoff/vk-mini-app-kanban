import React, { useMemo } from "react";
import marked from "marked";
import { Div } from "@vkontakte/vkui";

interface MarkdownProps {
  children: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  const rawText = useMemo(() => (children ? children.replace(/\\n/g, "\n") : ""), [children]);

  return (
    <Div>
      <span dangerouslySetInnerHTML={{ __html: marked(rawText) }} />
    </Div>
  );
};
