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
export const mdxReader = (fileContent: string): MdxData | undefined => {
  const metadataRegex = /---\s*([\s\S]*?)\s*---/;
  const matcher = metadataRegex.exec(fileContent);

  if (!matcher) {
    throw new Error('Metadata is not defined in the MDX file.');
  }

  const metadataBlock = matcher[1];
  const content = fileContent.replace(metadataRegex, '').trim();
  const metadataValue = metadataBlock.trim().split('\n');
  const metadata: Partial<Metadata> = {};

  metadataValue.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
};

export default mdxReader;