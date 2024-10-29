import mdxReader, { MdxData, Metadata } from './index';

describe('mdxReader', () => {
  it('should parse metadata and content correctly', () => {
    const mdxContent = `
---
title: 'Test Title'
publishedAt: '2024-01-01'
summary: 'This is a test summary.'
image: 'test-image.png'
tags: 'test,mdx,reader'
---

This is the content of the MDX file.
    `;

    const expectedMetadata: Metadata = {
      title: 'Test Title',
      publishedAt: '2024-01-01',
      summary: 'This is a test summary.',
      image: 'test-image.png',
      tags: 'test,mdx,reader',
    };

    const result = mdxReader(mdxContent) as MdxData;
    expect(result).toBeDefined();
    expect(result.metadata).toEqual(expectedMetadata);
    expect(result.content).toBe('This is the content of the MDX file.');
  });

  it('should throw an error if metadata is missing', () => {
    const mdxContent = `
This content has no metadata block.
    `;

    expect(() => mdxReader(mdxContent)).toThrow('Metadata is not defined in the MDX file.');
  });

  it('should handle metadata with optional fields', () => {
    const mdxContent = `
---
title: 'Test with No Image'
publishedAt: '2024-01-01'
summary: 'A summary without an image or tags.'
---

Content for MDX without optional metadata fields.
    `;

    const expectedMetadata: Partial<Metadata> = {
      title: 'Test with No Image',
      publishedAt: '2024-01-01',
      summary: 'A summary without an image or tags.',
    };

    const result = mdxReader(mdxContent) as MdxData;
    expect(result).toBeDefined();
    expect(result.metadata).toMatchObject(expectedMetadata);
    expect(result.metadata.image).toBeUndefined();
    expect(result.metadata.tags).toBeUndefined();
    expect(result.content).toBe('Content for MDX without optional metadata fields.');
  });
});