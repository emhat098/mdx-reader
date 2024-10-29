// index.d.ts

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string;
};

export interface MdxData {
  content: string;
  metadata: Metadata;
}

/**
 * Reads MDX content and extracts metadata.
 *
 * @param fileContent - The content of the MDX file as a string.
 * @returns The parsed MDX data, including metadata and content.
 */
declare function mdxReader(fileContent: string): MdxData | undefined;

export default mdxReader;